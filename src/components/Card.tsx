import styled from 'styled-components';
import { CardProps, states } from '../types';
import { TiDelete } from 'react-icons/ti';
import { useState } from 'react';
import EditGameForm from './EditGameForm';
import { createPortal } from 'react-dom';

const stateToColor = new Map<states, string>([
  [states.Abandoned, 'var(--abandoned-color)'],
  [states.Finished, 'var(--finished-color)'],
  [states.FinishedFully, 'var(--finished-fully-color)'],
  [states.Playing, 'var(--playing-color)'],
  [states.Queued, 'var(--queued-color)'],
]);

const Card = ({ game, deleteGame, onClickBadge, size }: CardProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Wrapper
      $badgeColor={stateToColor.get(game.state) || 'gray'}
      $cardScale={size}
    >
      <div className='container' onClick={() => setShowModal(!showModal)}>
        <img src={game.image} />
        <div className='delete' onClick={() => deleteGame(game.id)}>
          <TiDelete size={40} style={{ color: 'var(--icon-color)' }} />
        </div>
        <div className='badge' onClick={() => onClickBadge(game)}>
          {game.state}
        </div>
        <div className='rating'>{game.rating}</div>
        <div className='overlay'>
          <h1>{game.name}</h1>
        </div>
      </div>
      {showModal &&
        createPortal(
          <EditGameForm setShowModal={setShowModal} game={game} />,
          document.body
        )}
    </Wrapper>
  );
};
export default Card;

const Wrapper = styled.div<{ $badgeColor: string; $cardScale: number[] }>`
  position: relative;
  width: ${(props) => props.$cardScale[0]}px;
  height: ${(props) => props.$cardScale[1]}px;
  aspect-ratio: 2.14 / 1;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 10px;
  cursor: pointer;
  .rating {
    position: absolute;
    z-index: 1000;
    top: 5px;
    left: 15px;
    font-size: 1.6rem;
    transform: scale(0);
    transition: transform 0.1s ease;
  }
  .container:hover .rating {
    transform: scale(1);
  }
  img {
    border-radius: 10px;
    user-select: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delete {
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 5px;
    cursor: pointer;
    transform: scale(0);
    transition: transform 0.1s ease;
  }
  .container:hover .delete:hover {
    transform: scale(1.2);
  }
  .container:hover .delete {
    transform: scale(1);
  }
  .badge {
    position: absolute;
    z-index: 1000;
    right: 10px;
    bottom: 15px;
    background-color: ${(props) => props.$badgeColor};
    border-radius: 20px;
    width: 80px;
    height: 15px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 1);
    user-select: none;
    cursor: pointer;
  }
  .badge:hover {
    transform: scale(1.05);
    transition: transform 0.1s ease;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: scale(1);
    transition: transform 0.5s ease;
  }
  .container:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease;
  }
  .overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
    transition: 0.5s ease;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .overlay h1 {
    font-size: 2.5rem;
    text-align: center;
  }
  .container:hover .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }
`;
