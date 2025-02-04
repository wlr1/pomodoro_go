"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MyContext } from "../../Workspace";
import PomoTimerSettings from "../PomoTimerSettings/PomoTimerSettings";

import { useDraggable } from "@dnd-kit/core";
import { PomoTimerProps } from "@/app/utility/types/types";

import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  changeMode,
  updateRemainingTime,
} from "@/app/redux/slices/pomodoroSlice/pomodoroSlice";
import {
  changePhase,
  fetchTimerStatus,
  getPomodoroSettings,
  startPomodoro,
  stopPomodoro,
} from "@/app/redux/slices/pomodoroSlice/asyncActions";

import { FaRegWindowMinimize } from "react-icons/fa";
import { FiSettings, FiRefreshCw } from "react-icons/fi";
import { Howl } from "howler";

const PomoTimer: React.FC<PomoTimerProps> = ({
  widgetInfo,
  setOpenSettings,
  openSettings,
  setIsTimerActive,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { settings, currentPhase, isRunning, remainingTime } = useSelector(
    (state: RootState) => state.pomodoro
  );

  // Main theme no konteksta
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "The PomoTimer component should be used within MyContext.Provider."
    );
  }
  const { theme } = context;

  // Timer mode switch
  const handleChangeMode = useCallback(
    async (mode: string) => {
      if (
        mode === "pomodoro" ||
        mode === "shortBreak" ||
        mode === "longBreak"
      ) {
        await dispatch(changePhase(mode));
        dispatch(changeMode(mode));
      }
    },
    [dispatch]
  );

  // Audio
  const startAudio = useMemo(() => {
    return new Howl({
      src: [`${process.env.NEXT_PUBLIC_START_PAUSE_AUDIO}`],
      volume: 0.2,
    });
  }, []);

  const playAudio = useCallback(() => {
    startAudio.play();
  }, [startAudio]);

  const alarmAudio = useMemo(() => {
    return new Howl({
      src: [`${process.env.NEXT_PUBLIC_ALARM_AUDIO}`],
      volume: 0.2,
    });
  }, []);

  const startAlarmAudio = useCallback(() => {
    alarmAudio.play();
  }, [alarmAudio]);

  // Start/Stop timer
  const handleStart = useCallback(() => {
    if (!isRunning) {
      dispatch(startPomodoro(currentPhase));
      playAudio();
    }
  }, [dispatch, currentPhase, isRunning, playAudio]);

  const handleStop = async () => {
    await dispatch(stopPomodoro());
    dispatch(fetchTimerStatus());
    playAudio();
  };

  // format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  // Restores the original time if the timer is not running
  useEffect(() => {
    if (!isRunning) {
      const updateInitialTime = () => {
        let initialTime = 0;
        if (currentPhase === "pomodoro") {
          initialTime = settings.pomodoro * 60;
        } else if (currentPhase === "shortBreak") {
          initialTime = settings.shortBreak * 60;
        } else if (currentPhase === "longBreak") {
          initialTime = settings.longBreak * 60;
        }
        dispatch(updateRemainingTime(initialTime));
      };
      updateInitialTime();
    }
  }, [
    currentPhase,
    settings.pomodoro,
    settings.shortBreak,
    settings.longBreak,
    dispatch,
    isRunning,
  ]);

  // timer isRunning then refresh time
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatch(fetchTimerStatus());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, isRunning, remainingTime]);

  // alarm audio if timer = 1
  useEffect(() => {
    if (remainingTime === 1) {
      startAlarmAudio();
    }
  }, [remainingTime, startAlarmAudio]);

  // website title change
  useEffect(() => {
    document.title = isRunning
      ? `${formatTime(remainingTime)} | ${currentPhase}`
      : "workspace_go by wlr1";
  }, [remainingTime, isRunning, currentPhase]);

  // fetch settings
  useEffect(() => {
    dispatch(getPomodoroSettings());
  }, [dispatch]);

  //=====================
  // DnD logic
  //=====================

  const staticPosition = widgetInfo ? widgetInfo : { xPos: 0, yPos: 0 };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: dragging,
  } = useDraggable({
    id: "pomo-timer",
  });

  const dynamicPosition = transform
    ? { x: transform.x, y: transform.y }
    : { x: 0, y: 0 };

  const combinedPosition = {
    xPos: staticPosition.xPos + dynamicPosition.x,
    yPos: staticPosition.yPos + dynamicPosition.y,
  };

  useEffect(() => {
    setIsDragging(dragging);
  }, [dragging]);

  return (
    <div
      className="bg-main dark:bg-lightMain text-white w-[360px] p-4 rounded-lg shadow-md"
      style={{
        transform: `translate3d(${combinedPosition?.xPos}px, ${combinedPosition?.yPos}px, 0)`,
        position: "fixed",
      }}
    >
      {/* Header sadaļa */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-700 dark:bg-neutral-700 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 dark:bg-neutral-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-500 dark:bg-neutral-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 dark:bg-neutral-400 rounded-full"></div>
        </div>

        {/* "Drag handle" element */}
        <div
          className="w-[270px] h-[40px] absolute"
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        ></div>

        <button
          className="text-gray-400 dark:text-lightText pb-2"
          onClick={setIsTimerActive}
        >
          <FaRegWindowMinimize
            size={14}
            color={theme === "dark" ? "#4e4e4e" : "white"}
          />
        </button>
      </div>

      {/* Dalītājs */}
      <div className="w-[360px] h-[1px] bg-white/25 dark:bg-lightBorder absolute right-0"></div>

      {/* Timer sadaļa */}
      <div className="flex justify-center mt-6">
        <div className="w-full">
          <h1 className="text-5xl dark:text-lightText font-bold">
            {formatTime(remainingTime)}
          </h1>
        </div>

        {/* Pogas sadaļa */}
        <div className="flex m-auto gap-4">
          <button
            className="px-8 py-1 bg-transparent border border-white dark:border-lightBorder rounded-lg"
            onClick={isRunning ? handleStop : handleStart}
          >
            <span className="font-semibold text-md dark:text-lightText">
              {isRunning ? "Stop" : "Start"}
            </span>
          </button>
          <button className="">
            <FiRefreshCw
              color={theme === "dark" ? "#4e4e4e" : "white"}
              size={20}
            />
          </button>
        </div>
      </div>

      {/* Tabs sadaļa */}
      <div className="flex justify-around mt-6 text-sm">
        <button
          className={
            currentPhase === "pomodoro"
              ? "border-b-2 border-gray-400 dark:border-lightBorder pb-1"
              : ""
          }
          onClick={() => handleChangeMode("pomodoro")}
        >
          <span className="dark:text-lightText">Pomodoro</span>
        </button>
        <button
          className={
            currentPhase === "shortBreak"
              ? "border-b-2 border-gray-400 dark:border-lightBorder pb-1"
              : ""
          }
          onClick={() => handleChangeMode("shortBreak")}
        >
          <span className="dark:text-lightText">Short break</span>
        </button>
        <button
          className={
            currentPhase === "longBreak"
              ? "border-b-2 border-gray-400 dark:border-lightBorder pb-1"
              : ""
          }
          onClick={() => handleChangeMode("longBreak")}
        >
          <span className="dark:text-lightText">Long break</span>
        </button>

        {/* Settings ikona */}
        <div className="flex">
          <button onClick={setOpenSettings}>
            <FiSettings
              color={theme === "dark" ? "#4e4e4e" : "white"}
              size={20}
            />
          </button>
        </div>
      </div>

      {openSettings && <PomoTimerSettings />}
    </div>
  );
};

export default PomoTimer;
