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
};

export type CardProps = {
  game: game;
  deleteGame: (id: string) => void;
  onClickBadge: (game: game) => void;
};

export type DisplayProps = {
  games: game[];
  categorize: boolean;
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

export type GameContextType = {
  games: game[];
  setGames: Dispatch<SetStateAction<game[]>>;
  deleteGame: (id: string) => void;
  addGame: (game: game) => void;
  updateGame: (updatedGame: game) => void;
  getFilteredGames: (name: string | null, filter: string | states) => game[];
};
