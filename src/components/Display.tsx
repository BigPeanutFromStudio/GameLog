import styled from 'styled-components';
import Card from './Card';
import { DisplayProps, game, states } from '../types';
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import { MdCategory, MdOutlineCategory } from 'react-icons/md';
import { IoIosAddCircle, IoMdSettings } from 'react-icons/io';
import { useGameContext } from '../context/GameContext';
import { useSettingsContext } from '../context/SettingsContext';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import SettingsMenu from './SettingsMenu';
import AddGameForm from './AddGameForm';
import Button from './UI/Button';
import Input from './UI/Input';
import Select from './UI/Select';

const Display = ({ games, setSearch, search }: DisplayProps) => {
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
  } = useSettingsContext();

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddGameFormModal, setShowAddGameFormModal] = useState(false);

  const handleShowAddGameFormModal = () => {
    setShowAddGameFormModal(!showAddGameFormModal);
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
      {showAddGameFormModal &&
        createPortal(
          <AddGameForm setShowModal={setShowAddGameFormModal} />,
          document.body
        )}
      {showSettingsModal &&
        createPortal(
          <SettingsMenu setShowModal={setShowSettingsModal} />,
          document.body
        )}
      <div className='options'>
        <div className='form'>
          <div className='search-bar'>
            <Button
              icon={
                <IoIosAddCircle
                  size={50}
                  color='rgba(255, 255, 255, 0.4)'
                  style={{ transform: 'inherit', transition: 'inherit' }}
                />
              }
              onClick={handleShowAddGameFormModal}
            />
            <Input
              type='text'
              placeholder='Search'
              onChange={handleSearchChange}
              name='search'
              value={search ?? ''}
              minWidth='1000px'
            />
            <Button
              icon={<IoMdSettings size={50} />}
              onClick={() => setShowSettingsModal(!showSettingsModal)}
            />
          </div>
          <div className='below'>
            <div className='sort-filters'>
              <div className='sort-container'>
                <h1>Sort by:</h1>
                <Select
                  name='sort'
                  value={sortMethod}
                  onChange={handleSortChange}
                  options={[
                    { value: 'byname', label: 'Name' },
                    { value: 'byreview', label: 'Rating' },
                  ]}
                />
                <Button
                  icon={
                    isAscending ? (
                      <FaSortAmountDownAlt size={30} />
                    ) : (
                      <FaSortAmountDown size={30} />
                    )
                  }
                  onClick={() => setIsAscending(!isAscending)}
                />
              </div>
              <div className='sort-container'>
                <h1>Filter by:</h1>
                <Select
                  name='state'
                  value={filter}
                  onChange={handleFilterChange}
                  options={
                    [{ value: 'all', label: 'All' }].concat(
                      Object.keys(states).map((key, index) => ({
                        value: key,
                        label: Object.values(states)[index],
                      }))
                    ) ?? []
                  }
                />
              </div>

              <div className='sort-container'>
                <h1>Group by:</h1>
                <Select
                  name='categorize'
                  value={categorizeBy}
                  onChange={handleCategorizeByChange}
                  options={[
                    { value: 'state', label: 'State' },
                    { value: 'platform', label: 'Platform' },
                  ]}
                />
                <Button
                  icon={
                    categorize ? (
                      <MdCategory size={30} />
                    ) : (
                      <MdOutlineCategory size={30} />
                    )
                  }
                  onClick={() => setCategorize(!categorize)}
                />
              </div>
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
  user-select: none;
  .games {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${(props) => props.$cardWidth}px, auto)
    );
    gap: 5px;
    justify-content: start;
  }
  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
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
    font-size: var(--xlarge-font);
  }
  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
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
    justify-content: center;
    align-items: center;
    margin-top: 80px;
  }

  .sort-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .sort-filters {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 80px;
    margin-top: 20px;
  }
  .sort-style {
    width: 40px;
    height: 40px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    background-color: var(--primary-color);
    cursor: pointer;
    margin-left: 5px;
  }
  .sort-filters h1 {
    margin-left: 25px;
  }
`;
