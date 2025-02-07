import styled from 'styled-components';
import Card from './Card';
import AddGameBtn from './AddGameBtn';
import { useContext } from 'react';
import { GameContext } from '../main';
import { DisplayProps, game, GameContextType, states } from '../types';

const Display = ({ games, categorize }: DisplayProps) => {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    console.log('Something went wrong with the context');
    return null;
  }
  const { deleteGame, updateGame }: GameContextType = gameContext;

  const cycleStates = (game: game) => {
    const currentStateIndex = Object.values(states).indexOf(game.state);
    const nextStateIndex = (currentStateIndex + 1) % 5;

    updateGame({
      id: game.id,
      name: game.name,
      state: Object.values(states)[nextStateIndex] as states,
      image: game.image,
    });
  };

  return (
    <Wrapper>
      <AddGameBtn />

      {categorize ? (
        Object.values(states).map(
          (state) =>
            games.filter((game) => game.state === state).length !== 0 && (
              <>
                <h1 className='category'>{state}</h1>
                <div className='games'>
                  {games
                    .filter((game) => game.state === state)
                    .map((game: game) => (
                      <Card
                        game={game}
                        key={game.id}
                        deleteGame={deleteGame}
                        onClickBadge={cycleStates}
                      />
                    ))}
                </div>
              </>
            )
        )
      ) : (
        <div className='games'>
          {games.map((game: game) => (
            <Card
              game={game}
              key={game.id}
              deleteGame={deleteGame}
              onClickBadge={cycleStates}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
export default Display;

const Wrapper = styled.div`
  padding: 15px;
  .games {
    display: grid;
    grid-template-columns: repeat(4, minmax(460px, 1fr));
    gap: 10px;
  }
  .category {
    margin-top: 20px;
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: 4rem;
  }
`;
