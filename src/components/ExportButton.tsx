import styled from 'styled-components';
import { useGameContext } from '../context/GameContext';
import { ExportButtonProps } from '../types';

const ExportButton = ({ saveMode }: ExportButtonProps) => {
  const { saveData } = useGameContext();

  const modes = ['All', 'Theme', 'Preferences', 'Games'];

  return (
    <Wrapper>
      <div className='container' onClick={() => saveData(saveMode)}>
        <h1>Export {modes[saveMode]}</h1>
      </div>
    </Wrapper>
  );
};
export default ExportButton;

const Wrapper = styled.div`
  width: 230px;
  height: 107px;
  margin-bottom: 10px;
  text-align: center;
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
  h1 {
    font-size: var(--medium-font);
  }
`;
