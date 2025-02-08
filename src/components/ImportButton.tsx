import { useRef, useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../main';
import { GameContextType } from '../types';

const ImportButton = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const gameContext = useContext(GameContext);
  if (!gameContext) {
    console.log('Something went wrong with the context');
    return null;
  }

  const { loadData }: GameContextType = gameContext;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLInputElement).value = '';
    inputFile.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
    }
    fileReader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        loadData(e.target.result);
      } else {
        console.error('Failed to load data: result is not a string');
      }
    };
  };

  return (
    <Wrapper>
      <div className='container' onClick={handleClick}>
        <h1>Import data</h1>
        <input type='file' ref={inputFile} onChange={handleChange} />
      </div>
    </Wrapper>
  );
};
export default ImportButton;

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
  input[type='file'] {
    display: none;
  }
`;
