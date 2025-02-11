export interface HeaderProps {
  setOpenUISettings: () => void;
  setOpenAccSettings: () => void;
  setIsTimerActive: () => void;
  setIsTodoActive: () => void;
  isTimerActive: boolean;
  isTodoActive: boolean;
  hideElementsActive: boolean;
  hideAfterSeconds: number;
}

export interface AppearanceProps {
  setOpenUISettings: (a: boolean) => void;
  openUISettings: boolean;
  setHideElementsActive: (a: boolean) => void;
  setHideAfterSeconds: (a: number) => void;
}

export interface UserAccountProps {
  setOpenAccSettings: () => void;
  openAccSettings: boolean;
}

export interface UserMenuProps {
  setOpenUISettings: () => void;
  setOpenAccSettings: () => void;
}

export interface WidgetInfo {
  xPos: number;
  yPos: number;
}

export interface SavedWidgetLayoutInfo {
  TimerWidget?: WidgetInfo;
  TodoWidget?: WidgetInfo;
}

export interface PomoTimerProps {
  openSettings: boolean;
  setOpenSettings: () => void;
  setIsTimerActive: () => void;
  widgetInfo?: WidgetInfo;
}

export interface PomoTimerSettingsProps {
  setIsHideCount: () => void;
  ishideCount: boolean;
}

export interface TodoProps {
  setIsTodoActive: () => void;
  widgetInfo?: WidgetInfo;
  dimensions: { width: number; height: number };
  setDimensions: (dimensions: { width: number; height: number }) => void;
}

//redux auth slice
export interface AuthState {
  emailError: string | null;
  passwordError: string | null;
  usernameError: string | null;
  error: string | null;
  errorLogin: string | null;
  errorCodeEmail: string | null;

  successCodeEmail: string | null;
  successResent: string | null;
  successLogout: string | null;
  success: string | null;
  successLogin: string | null;

  isLoading: boolean;
  user: any | null;
}

//redux auth .rejected
export interface ErrorPayload {
  error?: string;
  emailError?: string;
  passwordError?: string;
  usernameError?: string;
  errorLogin?: string;
  errorCodeEmail?: string;
}

export interface EmailModalProps {
  email: string;
}

//redux user slice
export interface UserState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  successDelete: string | null;
  username: string | null;
}

//user slice error payload
export interface UserErrorPayload {
  error?: string;
}

export interface PomodoroState {
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    autoTransitionEnabled: boolean;
  };
  currentPhase: "pomodoro" | "shortBreak" | "longBreak";
  remainingTime: number;
  isLoading: boolean;
  isRunning: boolean;
  completedPomodoros: number;
  error: string | null;
}

export interface PomodoroErrorPayload {
  error?: string;
}

export interface ContextProps {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}
