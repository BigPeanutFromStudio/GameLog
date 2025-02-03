import styled from 'styled-components';
import Navbar from './components/Navbar';
import Display from './components/Display';
import { game, states } from './types';

const games: game[] = [
  {
    name: 'Hollow Knight',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg?t=1695270428',
    state: states.Playing,
  },
  {
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.Finished,
  },
  {
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.FinishedFully,
  },
  {
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.Abandoned,
  },
  {
    name: 'Ultrakill',
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/header.jpg?t=1734890718',
    state: states.Queued,
  },
];

function App() {
  return (
    <Wrapper>
      <Navbar />
      <Display games={games} />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
`;
