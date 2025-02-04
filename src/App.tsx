import styled from 'styled-components';
import Navbar from './components/Navbar';
import Display from './components/Display';
import { game, states } from './types';
import { useState } from 'react';
import { GameContext } from './main';

const initialGames: game[] = [
  {
    id: 1,
    name: 'Hollow Knight',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg?t=1695270428',
    state: states.Playing,
  },
  {
    id: 2,
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.Finished,
  },
  {
    id: 3,
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.FinishedFully,
  },
  {
    id: 4,
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.Abandoned,
  },
  {
    id: 5,
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.Queued,
  },
];

function App() {
  const [games, setGames] = useState<game[]>(initialGames);

  const deleteGame = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const addGame = (game: game) => {
    const gameList = games;
    gameList.push(game);
    setGames(gameList);
  };

  return (
    <GameContext.Provider value={{ games, setGames, deleteGame, addGame }}>
      <Wrapper>
        <Navbar />
        <Display />
      </Wrapper>
    </GameContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
`;
