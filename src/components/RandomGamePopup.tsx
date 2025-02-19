import styled from 'styled-components';
import { useEffect, useCallback } from 'react';
import { RandomGamePopupProps } from '../types';

const RandomGamePopup = ({ setShowModal, game }: RandomGamePopupProps) => {
  const escFunction = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <Wrapper>
      <div className='form'>
        <h1>{game ? game.name : 'No games to randomize from'}</h1>
        <img src={game?.image} />
      </div>
    </Wrapper>
  );
};
export default RandomGamePopup;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  user-select: none;
  img {
    border-radius: var(--border-radius);
    user-select: none;
    width: 306px;
    height: 143px;
    object-fit: cover;
  }
  .form {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    min-width: 300px;
    min-height: 300px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 8px 24px 8px #0f1014;
  }
  .form h1 {
    margin-bottom: 30px;
    margin-top: 15px;
    font-size: var(--large-font);
    text-align: center;
  }
`;
