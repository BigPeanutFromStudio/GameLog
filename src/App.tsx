import styled from 'styled-components';
import Display from './components/Display';
import { game, states } from './types';
import { useEffect, useState } from 'react';
import { GameContext } from './main';
import FileSaver from 'file-saver';

// TODO: Add full customizability
// TODO: Add support for custom local images
// TODO: Better scaling cards (text, ratings, gaps, etc.)
// TODO: Add platform selection

const initialGames = JSON.parse(localStorage.getItem('games') || '[]');
const initialSettings = JSON.parse(
  localStorage.getItem('settings') ||
    '{ "filter": "all", "sortMethod": "byname", "isAscending": true, "categorize": false, "cardScale": [460, 215]}'
);
function App() {
  const [games, setGames] = useState<game[]>(initialGames);
  const [filter, setFilter] = useState(initialSettings.filter);
  const [search, setSearch] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState(initialSettings.sortMethod);
  const [isAscending, setIsAscending] = useState(initialSettings.isAscending);
  const [categorize, setCategorize] = useState(initialSettings.categorize);
  const [cardScale, setCardScale] = useState(initialSettings.cardScale);

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
    const settings = {
      filter: filter,
      sortMethod: sortMethod,
      isAscending: isAscending,
      categorize: categorize,
      cardScale: cardScale,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [games, filter, sortMethod, isAscending, categorize, cardScale]);

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

  const getFilteredGames = (name: string | null, filter: string | states) => {
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
  };

  const sortGames = (unsortedGames: game[]) => {
    switch (sortMethod) {
      case 'byname': {
        return isAscending
          ? unsortedGames.sort((a, b) => a.name.localeCompare(b.name))
          : unsortedGames.sort((a, b) => b.name.localeCompare(a.name));
      }
      case 'bystate': {
        const stateOrder = Object.values(states);
        return isAscending
          ? unsortedGames.sort(
              (a, b) =>
                stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state)
            )
          : unsortedGames.sort(
              (a, b) =>
                stateOrder.indexOf(b.state) - stateOrder.indexOf(a.state)
            );
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
          games={sortGames(getFilteredGames(search, filter))}
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
`;
