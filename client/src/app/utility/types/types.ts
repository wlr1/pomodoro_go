export type Position = { x: number; y: number };

export interface HeaderProps {
  openAppearance: () => void;
  openAccountSettings: () => void;
}

export interface AppearanceProps {
  openAppearance: () => void;
  openUISettings: boolean;
}

export interface UserAccountProps {
  openAccountSettings: () => void;
  openAccSettings: boolean;
}
