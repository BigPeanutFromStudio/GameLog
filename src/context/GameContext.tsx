// filepath: src/context/GameContext.tsx
import { createContext, useContext } from 'react';
import { game } from '../types';

// Define the structure of the game context
export interface GameContextProps {
  games: game[];
  setGames: React.Dispatch<React.SetStateAction<game[]>>;
  deleteGame: (id: string) => void;
  addGame: (game: game) => void;
  updateGame: (updatedGame: game) => void;
  getFilteredGames: (name: string | null, filter: string[]) => game[];
  saveData: (saveMode: number) => void;
  loadData: (data: string) => void;
}

export const GameContext = createContext<GameContextProps | null>(null);

export const GameProvider = GameContext.Provider;

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
