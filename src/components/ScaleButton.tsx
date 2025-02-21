import styled from 'styled-components';
import { ScaleButtonProps } from '../types';
import { useState } from 'react';
import { scales } from '../utils/constants';

const ScaleButton = ({ setCardScale, cardScale }: ScaleButtonProps) => {
  const scaleTexts = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Vertical'];
  const [currentScaleIndex, setCurrentScaleIndex] = useState(() => {
    return scales.findIndex(
      (scale) => cardScale[0] === scale[0] && cardScale[1] === scale[1]
    );
  });

  const handleScale = () => {
    const nextScaleIndex = (currentScaleIndex + 1) % scales.length;
    setCardScale(scales[nextScaleIndex]);
    setCurrentScaleIndex(nextScaleIndex);
  };

  return (
    <Wrapper>
      <div className='container' onClick={handleScale}>
        <h4>{scaleTexts[currentScaleIndex]}</h4>
      </div>
    </Wrapper>
  );
};
export default ScaleButton;

const Wrapper = styled.div`
  margin-right: 30px;
  width: 150px;
  height: 70px;
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
  h4 {
    font-size: var(--small-font);
  }
`;
