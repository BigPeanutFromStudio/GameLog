import styled from 'styled-components';
import Display from './components/Display';
import { game, states } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameProvider } from './context/GameContext';
import {
  saveData,
  loadData,
  getFilteredGames as getFilteredGamesUtil,
} from './utils/data';
import { useSettingsContext } from './context/SettingsContext';
import { GlobalStyle } from './components/GlobalStyles.tsx';

// TODO: Add support for custom local images
// TODO: Better scaling cards (text, ratings, gaps, etc.)
// TODO: Make it look better for the love of god please sometimes it's an eyesore mate, can you just put a little time into making it consistent bro? (fonts, inputs etc.). Maybe try to make every form element into its own. Vertical not horizontal. Add responsivness.
// TODO: Fix display not refreshing on importing data

const initialGames = JSON.parse(localStorage.getItem('games') || '[]');
function App() {
  const [games, setGames] = useState<game[]>(initialGames);
  const [search, setSearch] = useState<string | null>(null);
  const {
    filter,
    setFilter,
    sortMethod,
    setSortMethod,
    isAscending,
    setIsAscending,
    categorize,
    setCategorize,
    categorizeBy,
    setCategorizeBy,
    cardScale,
    setCardScale,
    theme,
    setTheme,
    savedTheme,
    saveTheme,
  } = useSettingsContext();

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
  }, [
    games,
    filter,
    sortMethod,
    isAscending,
    categorize,
    cardScale,
    categorizeBy,
    theme,
  ]);

  const deleteGame = useCallback((id: string) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  }, []);

  const addGame = useCallback((game: game) => {
    setGames((prevGames) => [...prevGames, game]);
  }, []);

  const updateGame = useCallback((updatedGame: game) => {
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  }, []);

  const handleSaveData = useCallback(
    (saveMode: number) => {
      saveData(
        games,
        filter,
        sortMethod,
        isAscending,
        categorize,
        categorizeBy,
        cardScale,
        theme,
        savedTheme,
        saveMode
      );
    },
    [
      games,
      filter,
      sortMethod,
      isAscending,
      categorize,
      categorizeBy,
      cardScale,
      theme,
      savedTheme,
    ]
  );

  const handleLoadData = useCallback(
    (data: string) => {
      loadData(
        data,
        setGames,
        setFilter,
        setSortMethod,
        setIsAscending,
        setCategorize,
        setCategorizeBy,
        setCardScale,
        setTheme,
        saveTheme
      );
    },
    [
      setCardScale,
      setCategorize,
      setFilter,
      setIsAscending,
      setSortMethod,
      setTheme,
      setCategorizeBy,
      saveTheme,
    ]
  );

  const getFilteredGames = useCallback(
    (name: string | null, filter: string | states) => {
      return getFilteredGamesUtil(games, name, filter);
    },
    [games]
  );

  const filteredGames = useMemo(() => {
    return getFilteredGames(search, filter);
  }, [search, filter, getFilteredGames]);

  const sortedGames = useMemo(() => {
    const sortGames = (unsortedGames: game[]) => {
      switch (sortMethod) {
        case 'byname': {
          return isAscending
            ? unsortedGames.sort((a, b) => a.name.localeCompare(b.name))
            : unsortedGames.sort((a, b) => b.name.localeCompare(a.name));
        }
        case 'byreview': {
          return isAscending
            ? unsortedGames.sort((a, b) => a.rating - b.rating)
            : unsortedGames.sort((a, b) => b.rating - a.rating);
        }
        default:
          return unsortedGames;
      }
    };
    return sortGames(filteredGames);
  }, [filteredGames, sortMethod, isAscending]);

  const gameContextValue = useMemo(
    () => ({
      games,
      setGames,
      deleteGame,
      addGame,
      updateGame,
      getFilteredGames,
      saveData: handleSaveData,
      loadData: handleLoadData,
    }),
    [
      games,
      setGames,
      deleteGame,
      addGame,
      updateGame,
      getFilteredGames,
      handleLoadData,
      handleSaveData,
    ]
  );

  return (
    <GameProvider value={gameContextValue}>
      <GlobalStyle theme={theme} />
      <Wrapper>
        <Display setSearch={setSearch} games={sortedGames} />
      </Wrapper>
    </GameProvider>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--background-color);
  box-sizing: border-box;
  color: var(--text-color);
`;
