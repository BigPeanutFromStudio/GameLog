import { Dispatch, SetStateAction } from 'react';

export enum states {
  Finished = 'Finished',
  FinishedFully = '100%',
  Playing = 'Playing',
  Queued = 'Queued',
  Abandoned = 'Abandoned',
}

export type game = {
  id: number;
  name: string;
  state: states;
  image: string;
};

export type CardProps = {
  game: game;
  deleteGame: (id: number) => void;
};

export type DisplayProps = {
  games: game[];
};

export type GameContextType = {
  games: game[];
  setGames: Dispatch<SetStateAction<game[]>>;
  deleteGame: (id: number) => void;
};
