"use client";

import React, { useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";
import { MdCloseFullscreen, MdOutlineKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreenMode = () => {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      element.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <header className="w-full p-2 flex justify-between items-center fixed ">
      {/* Left Section */}
      <div className="bg-main rounded-md px-2 py-1 flex justify-center items-center ">
        <div className="flex hover:bg-gray-700 hover:rounded-md px-1  cursor-pointer">
          <span className="text-white text-md mr-1">2</span>
          <BsFire color="darkorange" size={19} />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center bg-main  rounded-md text-white p-1">
        {/* enter/exit fullscreen */}
        <div
          className="hover:bg-gray-700 p-1 hover:rounded-md cursor-pointer"
          onClick={toggleFullscreenMode}
        >
          {isFullscreen ? (
            <AiOutlineFullscreenExit size={19} />
          ) : (
            <AiOutlineFullscreen size={19} />
          )}
        </div>

        {/* divider */}
        <div className="h-5 w-[1px] bg-gray-500 mx-2"></div>

        {/* user dropdown menu */}
        <div className="flex items-center   p-1 hover:bg-gray-700 hover:rounded-md  cursor-pointer">
          <LuUserRound size={19} className="mr-[2px]" />
          <MdOutlineKeyboardArrowDown size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;
