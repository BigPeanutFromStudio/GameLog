import styled from 'styled-components';
import { CardProps, states } from '../types';
import { TiDelete } from 'react-icons/ti';

const stateToColor = new Map<states, string>([
  [states.Abandoned, 'var(--abandoned-color)'],
  [states.Finished, 'var(--finished-color)'],
  [states.FinishedFully, 'var(--finished-fully-color)'],
  [states.Playing, 'var(--playing-color)'],
  [states.Queued, 'var(--queued-color)'],
]);

const Card = ({ game, deleteGame, onClickBadge }: CardProps) => {
  return (
    <Wrapper $badgeColor={stateToColor.get(game.state) || 'gray'}>
      <div className='container'>
        <img src={game.image} />
        <div className='delete' onClick={() => deleteGame(game.id)}>
          <TiDelete size={30} style={{ color: 'var(--icon-color)' }} />
        </div>
        <div className='badge' onClick={() => onClickBadge(game)}>
          {game.state}
        </div>
        <div className='overlay'>
          <h1>{game.name}</h1>
        </div>
      </div>
    </Wrapper>
  );
};
export default Card;

const Wrapper = styled.div<{ $badgeColor: string }>`
  position: relative;
  width: 460px;
  height: 215px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 10px;
  img {
    border-radius: 10px;
    user-select: none;
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
    width: 460px;
    height: 215px;
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
