import styled from 'styled-components';
import Card from './Card';
import AddGameBtn from './AddGameBtn';
import { useContext } from 'react';
import { GameContext } from '../main';
import { DisplayProps, game, GameContextType, states } from '../types';
import ScaleButton from './ScaleButton';
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import { MdCategory, MdOutlineCategory } from 'react-icons/md';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';

const Display = ({
  games,
  categorize,
  cardScale,
  setCardScale,
  setSearch,
  setFilter,
  isAscending,
  setIsAscending,
  setSortMethod,
  setCategorize,
  sortMethod,
  filter,
}: DisplayProps) => {
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
      rating: game.rating,
    });
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value);
  };

  return (
    <Wrapper $cardWidth={cardScale[0]}>
      <div className='options'>
        <div className='form'>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search...'
              onChange={handleSearchChange}
            />
          </div>
          <div className='below'>
            <div className='sort-filters'>
              <div className='sort-container'>
                <h1>Sort by:</h1>
                <select
                  name='sort'
                  defaultValue={sortMethod}
                  onChange={handleSortChange}
                >
                  <optgroup>
                    <option value='byname'>Name</option>
                    <option value='bystate'>State</option>
                    <option value='byreview'>Rating</option>
                  </optgroup>
                </select>
                <div
                  className='sort-style'
                  onClick={() => setIsAscending(!isAscending)}
                >
                  {isAscending ? (
                    <FaSortAmountDownAlt size={30} />
                  ) : (
                    <FaSortAmountDown size={30} />
                  )}
                </div>

                <h1>Filter by:</h1>
                <select
                  name='state'
                  defaultValue={filter}
                  onChange={handleFilterChange}
                >
                  <optgroup>
                    <option value='all'>All</option>
                    {Object.keys(states).map((key, index) => (
                      <option key={index} value={key}>
                        {Object.values(states)[index]}
                      </option>
                    ))}
                  </optgroup>
                </select>

                <div
                  className='sort-style'
                  onClick={() => setCategorize(!categorize)}
                >
                  {categorize ? (
                    <MdCategory size={30} />
                  ) : (
                    <MdOutlineCategory size={30} />
                  )}
                </div>
              </div>
            </div>
            <div className='buttons'>
              <AddGameBtn />
              <ScaleButton cardScale={cardScale} setCardScale={setCardScale} />
              <ExportButton />
              <ImportButton />
            </div>
          </div>
        </div>
      </div>
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
                        size={cardScale}
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
              size={cardScale}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
export default Display;

const Wrapper = styled.div<{ $cardWidth: number }>`
  padding: 15px;
  .games {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${(props) => props.$cardWidth}px, 1fr)
    );
    gap: 10px;
  }
  .category {
    margin-top: 20px;
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: 4rem;
  }
  /* Experimenting */
  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
  }
  .below {
    display: flex;
    flex-direction: column;
    user-select: none;
  }
  .buttons {
    display: flex;
    margin: 20px;
    gap: 10px;
    flex-wrap: wrap;
  }
  input {
    all: unset;
    display: block;
    background-color: var(--primary-color);
    min-width: 400px;
    width: 80%;
    border-radius: 20px;
    padding: 20px;
    font-size: 1.3rem;
  }
  .sort-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
  }
  .sort-style {
    width: 32px;
    height: 32px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: var(--primary-color);
    cursor: pointer;
    margin-left: 5px;
  }
  h1 {
    margin-left: 15px;
  }
  select {
    all: unset;
    display: block;
    background-color: var(--primary-color);
    width: 150px;
    text-align: center;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    font-size: 1.3rem;
    cursor: pointer;
    user-select: none;
  }
`;
