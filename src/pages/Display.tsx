import styled from 'styled-components';
import Card from '../components/Card';
import { DisplayProps, game, states } from '../types';
import { IoIosAddCircle, IoMdSettings } from 'react-icons/io';
import { useGameContext } from '../context/GameContext';
import { useSettingsContext } from '../context/SettingsContext';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AddGameForm from '../components/AddGameForm';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { ImDice } from 'react-icons/im';
import RandomGamePopup from '../components/RandomGamePopup';
import { Link } from 'react-router-dom';

const Display = ({ games, setSearch, search }: DisplayProps) => {
  const { deleteGame } = useGameContext();
  const { categorize, categorizeBy, cardsPerRow } = useSettingsContext();

  const [showAddGameFormModal, setShowAddGameFormModal] = useState(false);
  const [showRandomGameModal, setShowRandomGameModal] = useState(false);
  const [randomizedGame, setRandomizedGame] = useState<game | null>(null);

  const handleRandomGame = () => {
    const gamesToRandomize = games.filter(
      (game) => game.state === states.Playing || game.state === states.Queued
    );
    const randomGame =
      gamesToRandomize[Math.floor(Math.random() * gamesToRandomize.length)];
    setRandomizedGame(randomGame);
    setShowRandomGameModal(true);
  };

  const handleShowAddGameFormModal = () => {
    setShowAddGameFormModal(!showAddGameFormModal);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
                      <Card game={game} key={game.id} deleteGame={deleteGame} />
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
                      <Card game={game} key={game.id} deleteGame={deleteGame} />
                    ))}
                </div>
              </>
            )
        );
      }
    }
  };

  return (
    <Wrapper $cardsPerRow={cardsPerRow}>
      {showAddGameFormModal &&
        createPortal(
          <AddGameForm setShowModal={setShowAddGameFormModal} />,
          document.body
        )}
      {showRandomGameModal &&
        createPortal(
          <RandomGamePopup
            setShowModal={setShowRandomGameModal}
            game={randomizedGame}
          />,
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
            <Button icon={<ImDice size={30} />} onClick={handleRandomGame} />
            <Input
              type='text'
              placeholder='Search'
              onChange={handleSearchChange}
              name='search'
              value={search ?? ''}
            />
            <Link className='link' to='/settings'>
              <Button icon={<IoMdSettings size={50} />} onClick={() => null} />
            </Link>
          </div>
        </div>
      </div>
      {categorize ? (
        generateCategories()
      ) : (
        <div className='games'>
          {games.map((game: game) => (
            <Card game={game} key={game.id} deleteGame={deleteGame} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};
export default Display;

const Wrapper = styled.div<{ $cardsPerRow: number }>`
  padding: 15px;
  user-select: none;
  .games {
    display: grid;
    grid-template-columns: repeat(${(props) => props.$cardsPerRow}, 1fr);
    gap: 5px;
    justify-content: start;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
  }
  .category {
    margin-top: 20px;
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: var(--xlarge-font);
    @media (max-width: 768px) {
      font-size: var(--large-font);
    }
  }
  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
  }
  .sort-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 5px;
    }
  }
  .sort-filters {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 80px;
    margin-top: 20px;
    @media (max-width: 768px) {
      gap: 20px;
    }
  }
  .link {
    text-decoration: none;
    color: var(--text-color);
  }
`;
