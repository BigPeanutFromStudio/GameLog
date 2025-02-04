import styled from 'styled-components';
import Card from './Card';
import AddGameBtn from './AddGameBtn';
import { useContext } from 'react';
import { GameContext } from '../main';
import { game, GameContextType } from '../types';

const Display = () => {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    console.log('Something went wrong with the context');
    return null;
  }
  const { games, deleteGame }: GameContextType = gameContext;
  return (
    <Wrapper>
      <AddGameBtn />
      {games.map((game: game) => (
        <Card game={game} key={game.id} deleteGame={deleteGame} />
      ))}
    </Wrapper>
  );
};
export default Display;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(460px, 1fr));
  gap: 10px;
  padding: 15px;
`;
