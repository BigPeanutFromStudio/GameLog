import { Dispatch, SetStateAction } from 'react';

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
};

export type CardProps = {
  game: game;
  deleteGame: (id: string) => void;
  onClickBadge: (game: game) => void;
  size: number[];
};

export type DisplayProps = {
  games: game[];
  categorize: boolean;
  cardScale: number[];
  setCardScale: (cardScale: number[]) => void;
  setFilter: (filter: string) => void;
  setSearch: (search: string | null) => void;
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
  setSortMethod: (sortMethod: string) => void;
  setCategorize: (categorize: boolean) => void;
  sortMethod: string;
  filter: string;
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

export type GameContextType = {
  games: game[];
  setGames: Dispatch<SetStateAction<game[]>>;
  deleteGame: (id: string) => void;
  addGame: (game: game) => void;
  updateGame: (updatedGame: game) => void;
  getFilteredGames: (name: string | null, filter: string | states) => game[];
  saveData: () => void;
  loadData: (data: string) => void;
};
