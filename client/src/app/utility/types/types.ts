export type Position = { x: number; y: number };

export interface HeaderProps {
  setOpenUISettings: () => void;
  setOpenAccSettings: () => void;
  setIsTimerActive: () => void;
  isTimerActive: boolean;
}

export interface AppearanceProps {
  setOpenUISettings: () => void;
  openUISettings: boolean;
}

export interface UserAccountProps {
  setOpenAccSettings: () => void;
  openAccSettings: boolean;
}

export interface UserMenuProps {
  setOpenUISettings: () => void;
  setOpenAccSettings: () => void;
}

export interface PomoTimerProps {
  openSettings: boolean;
  setOpenSettings: () => void;
  setIsTimerActive: () => void;
  position: Position;
}

//redux auth slice
export interface AuthState {
  emailError: string | null;
  passwordError: string | null;
  usernameError: string | null;
  error: string | null;
  success: string | null;
  successLogin: string | null;
  errorLogin: string | null;
  errorCodeEmail: string | null;
  successCodeEmail: string | null;
  successResent: string | null;
  isLoading: boolean;
  user: any | null;
}

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