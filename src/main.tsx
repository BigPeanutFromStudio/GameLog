import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createContext } from 'react';
import { GameContextType } from './types.ts';

export const GameContext = createContext<GameContextType | null>(null);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
