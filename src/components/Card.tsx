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

const Card = ({ game, deleteGame }: CardProps) => {
  return (
    <Wrapper $badgeColor={stateToColor.get(game.state) || 'gray'}>
      <div className='container'>
        <img src={game.image} />
        <div className='delete' onClick={() => deleteGame(game.id)}>
          <TiDelete size={30} style={{ color: 'var(--icon-color)' }} />
        </div>
        <div className='badge'>{game.state}</div>
      </div>
    </Wrapper>
  );
};
export default Card;

const Wrapper = styled.div<{ $badgeColor: string }>`
  width: 460px;
  height: 215px;
  .container {
    position: relative;
  }
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
    transform: scale(1);
    transition: transform 0.1s ease;
  }
  .delete:hover {
    transform: scale(1.2);
    transition: transform 0.1s ease;
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
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 1);
    user-select: none;
  }
  .container {
    transform: scale(1);
    transition: transform 0.5s ease;
  }
  .container:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease;
  }
`;
