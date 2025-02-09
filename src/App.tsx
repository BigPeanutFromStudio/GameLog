import styled from 'styled-components';
import Display from './components/Display';
import { game, states } from './types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameContext } from './main';
import FileSaver from 'file-saver';

// TODO: Add full customizability with a settings menu
// TODO: Fix styling 💀
// TODO: Reduce prop drilling, move load and save to seperate files, refactor code
// TODO: Add support for custom local images
// TODO: Better scaling cards (text, ratings, gaps, etc.)
// TODO: Fix display not refreshing on importing data

const initialGames = JSON.parse(localStorage.getItem('games') || '[]');
const initialSettings = JSON.parse(
  localStorage.getItem('settings') ||
    '{ "filter": "all", "sortMethod": "byname", "isAscending": true, "categorize": false, "categorizeBy":"state", "cardScale": [460, 215]}'
);
function App() {
  const [games, setGames] = useState<game[]>(initialGames);
  const [filter, setFilter] = useState(initialSettings.filter);
  const [search, setSearch] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState(initialSettings.sortMethod);
  const [isAscending, setIsAscending] = useState(initialSettings.isAscending);
  const [categorize, setCategorize] = useState(initialSettings.categorize);
  const [categorizeBy, setCategorizeBy] = useState(
    initialSettings.categorizeBy
  );
  const [cardScale, setCardScale] = useState(initialSettings.cardScale);

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
    const settings = {
      filter: filter,
      sortMethod: sortMethod,
      isAscending: isAscending,
      categorize: categorize,
      categorizeBy: categorizeBy,
      cardScale: cardScale,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [
    games,
    filter,
    sortMethod,
    isAscending,
    categorize,
    cardScale,
    categorizeBy,
  ]);

  const deleteGame = (id: string) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const addGame = (game: game) => {
    setGames([...games, game]);
  };

  const updateGame = (updatedGame: game) => {
    setGames(
      games.map((game) => (game.id === updatedGame.id ? updatedGame : game))
    );
  };

  const saveData = () => {
    const settings = {
      filter: filter,
      sortMethod: sortMethod,
      isAscending: isAscending,
      categorize: categorize,
      categorizeBy: categorizeBy,
      cardScale: cardScale,
    };
    const blob = new Blob(
      [JSON.stringify({ settings: settings, games: games })],
      { type: 'application/json' }
    );

    FileSaver.saveAs(blob, 'data.json');
  };

  const loadData = (data: string) => {
    const jsonData = JSON.parse(data);
    setGames([...jsonData.games]);
    setFilter(jsonData.settings.filter);
    setSortMethod(jsonData.settings.sortMethod);
    setIsAscending(jsonData.settings.isAscending);
    setCategorize(jsonData.settings.categorize);
    setCardScale(jsonData.settings.cardScale);
  };

  const getFilteredGames = useCallback(
    (name: string | null, filter: string | states) => {
      let filteredGames = [...games];
      if (name !== null && name !== '') {
        filteredGames = games.filter((game) =>
          game.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())
        );
      }
      if (filter === 'all') {
        return filteredGames;
      } else {
        filter = filter === 'FinishedFully' ? '100%' : filter;
        return filteredGames.filter((game) => game.state == filter);
      }
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

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        deleteGame,
        addGame,
        updateGame,
        getFilteredGames,
        saveData,
        loadData,
      }}
    >
      <Wrapper>
        <Display
          categorize={categorize}
          games={sortedGames}
          cardScale={cardScale}
          setCardScale={setCardScale}
          setFilter={setFilter}
          setSearch={setSearch}
          setIsAscending={setIsAscending}
          isAscending={isAscending}
          setSortMethod={setSortMethod}
          setCategorize={setCategorize}
          filter={filter}
          sortMethod={sortMethod}
          setCategorizeBy={setCategorizeBy}
          categorizeBy={categorizeBy}
        />
      </Wrapper>
    </GameContext.Provider>
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
