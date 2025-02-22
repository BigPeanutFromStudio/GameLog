import { Dispatch, SetStateAction } from 'react';
import { defaultTheme } from './theme/defaultTheme';
import { themes } from './context/SettingsContext';

export enum states {
  FinishedFully = '100%',
  Finished = 'Finished',
  Playing = 'Playing',
  Queued = 'Queued',
  Abandoned = 'Abandoned',
}

export type game = {
  id: string;
  name: string;
  state: states;
  image: string;
  rating: number;
  platform: string;
};

export type CardProps = {
  game: game;
  deleteGame: (id: string) => void;
};

export type DisplayProps = {
  games: game[];
  setSearch: (search: string | null) => void;
  search: string | null;
};

export type NavbarProps = {
  setFilter: (filter: string) => void;
  setSearch: (search: string | null) => void;
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
  setSortMethod: (sortMethod: string) => void;
  setCategorize: (categorize: boolean) => void;
  categorize: boolean;
  sortMethod: string;
  filter: string;
};

export type AddGameFormProps = {
  setShowModal: (showModal: boolean) => void;
};

export type EditGameFormProps = {
  setShowModal: (showModal: boolean) => void;
  game: game;
};

export type ScaleButtonProps = {
  setCardScale: (cardScale: number[]) => void;
  cardScale: number[];
};

export type ExportButtonProps = {
  saveMode: number;
};

export type ThemeTabsProps = {
  handleThemeChange: (theme: typeof defaultTheme) => void;
  theme: typeof defaultTheme;
  themes: typeof themes;
};

export type GameContextType = {
  games: game[];
  setGames: Dispatch<SetStateAction<game[]>>;
  deleteGame: (id: string) => void;
  addGame: (game: game) => void;
  updateGame: (updatedGame: game) => void;
  getFilteredGames: (name: string | null, filter: string | states) => game[];
  saveData: (saveMode: number) => void;
  loadData: (data: string) => void;
};

export type ButtonProps = {
  icon: JSX.Element;
  onClick: (() => void) | ((e: React.MouseEvent<HTMLDivElement>) => void);
  className?: string;
  children?: JSX.Element | string;
};

export type InputProps = {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
  value?: string;
  name: string;
  placeholder?: string;
  minWidth?: string;
  required?: boolean;
  defaultValue?: string;
};

export type Option = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
};

export type SelectProps = {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void | null;
  value?: string;
  name: string;
  minWidth?: string;
  options: Option[];
};

export type RandomGamePopupProps = {
  setShowModal: (showModal: boolean) => void;
  game: game | null;
};
