import { useRef } from 'react';
import styled from 'styled-components';
import { useGameContext } from '../context/GameContext';

const ImportButton = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const { loadData } = useGameContext();

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
        <h4>Import data</h4>
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
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1);
    transition: transform 0.1s ease;
  }
  .container:hover {
    transform: scale(1.05);
    transition: transform 0.1s ease;
  }
  input[type='file'] {
    display: none;
  }
  h4 {
    font-size: var(--medium-font);
    text-align: center;
  }
`;
