import styled from 'styled-components';
import Card from './Card';
import AddGameBtn from './AddGameBtn';
import { DisplayProps, game, states } from '../types';
import ScaleButton from './ScaleButton';
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import { MdCategory, MdOutlineCategory } from 'react-icons/md';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import { IoMdSettings } from 'react-icons/io';
import { useGameContext } from '../context/GameContext';
import { useSettingsContext } from '../context/SettingsContext';

const Display = ({ games, setSearch }: DisplayProps) => {
  const { deleteGame } = useGameContext();
  const {
    filter,
    setFilter,
    isAscending,
    setIsAscending,
    sortMethod,
    setSortMethod,
    categorize,
    setCategorize,
    categorizeBy,
    setCategorizeBy,
    cardScale,
    setCardScale,
  } = useSettingsContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value);
  };
  const handleCategorizeByChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategorizeBy(e.target.value);
  };

  const generateCategories = () => {
    switch (categorizeBy) {
      case 'state': {
        return Object.values(states).map(
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
                        size={cardScale}
                      />
                    ))}
                </div>
              </>
            )
        );
      }
      case 'platform': {
        const platforms = [...new Set(games.map((game) => game.platform))].sort(
          (a, b) => a.localeCompare(b)
        );
        return platforms.map(
          (platform) =>
            games.filter((game) => game.platform === platform).length !== 0 && (
              <>
                <h1 className='category'>{platform}</h1>
                <div className='games'>
                  {games
                    .filter((game) => game.platform === platform)
                    .map((game: game) => (
                      <Card
                        game={game}
                        key={game.id}
                        deleteGame={deleteGame}
                        size={cardScale}
                      />
                    ))}
                </div>
              </>
            )
        );
      }
    }
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
            <div className='settings-icon'>
              <IoMdSettings size={50} />
            </div>
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

                <h1>Group by:</h1>
                <select
                  name='categorize'
                  defaultValue={categorizeBy}
                  onChange={handleCategorizeByChange}
                >
                  <optgroup>
                    <option value='state'>State</option>
                    <option value='platform'>Platform</option>
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
        generateCategories()
      ) : (
        <div className='games'>
          {games.map((game: game) => (
            <Card
              game={game}
              key={game.id}
              deleteGame={deleteGame}
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
      minmax(${(props) => props.$cardWidth}px, auto)
    );
    gap: 10px;
  }
  .search-bar {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    margin-left: 25px;
  }
  .settings-icon {
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  .settings-icon:hover {
    transform: scale(1.1);
  }
  .category {
    margin-top: 20px;
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: 4rem;
  }
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
    margin-top: 20px;
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
  .sort-filters h1 {
    margin-left: 25px;
  }
  select {
    all: unset;
    display: block;
    background-color: var(--primary-color);
    width: 150px;
    text-align: center;
    border-radius: 20px;
    padding: 20px;
    font-size: 1.3rem;
    margin-left: 5px;
    cursor: pointer;
    user-select: none;
  }
`;
