import styled from 'styled-components';
import { useContext } from 'react';
import { GameContextType } from '../types';
import { GameContext } from '../main';

const ExportButton = () => {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    console.log('Something went wrong with the context');
    return null;
  }

  const { saveData }: GameContextType = gameContext;

  return (
    <Wrapper>
      <div className='container' onClick={saveData}>
        <h1>Export data</h1>
      </div>
    </Wrapper>
  );
};
export default ExportButton;

const Wrapper = styled.div`
  width: 230px;
  height: 107px;
  margin-bottom: 10px;
  .container {
    position: relative;
    width: inherit;
    height: inherit;
    background-color: var(--primary-color);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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
