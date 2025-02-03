export enum states {
  Finished = 'Finished',
  FinishedFully = '100%',
  Playing = 'Playing',
  Queued = 'Queued',
  Abandoned = 'Abandoned',
}

export type game = {
  name: string;
  state: states;
  image: string;
};

export type CardProps = {
  game: game;
};

export type DisplayProps = {
  games: game[];
};
