import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSettingsContext } from '../context/SettingsContext';

const ThemeSettingsPage = () => {
  const { theme } = useSettingsContext();

  const [colors, setColors] = useState(theme.colors);

  useEffect(() => {
    setColors(theme.colors);
    // setBorderRadius(theme.borderRadius);
    // setFont(theme.font);
  }, [theme]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };
  return (
    <Wrapper>
      <div className='options'>
        <h1>Colors</h1>
        <div className='group'>
          <div className='color'>
            <label htmlFor='primary'>Primary Color:</label>
            <input
              type='color'
              name='primary'
              value={colors.primary}
              onChange={handleColorChange}
            />
          </div>
          <div className='color'>
            <label htmlFor='secondary'>Secondary Color:</label>
            <input
              type='color'
              name='secondary'
              value={colors.secondary}
              onChange={handleColorChange}
            />
          </div>
          <div className='color'>
            <label htmlFor='background'>Background Color:</label>
            <input
              type='color'
              name='background'
              value={colors.background}
              onChange={handleColorChange}
            />
          </div>
          <div className='color'>
            <label htmlFor='text'>Text Color:</label>
            <input
              type='color'
              name='text'
              value={colors.text}
              onChange={handleColorChange}
            />
          </div>
          <div className='color'>
            <label htmlFor='accent'>Accent Color:</label>
            <input
              type='color'
              name='accent'
              value={colors.accent}
              onChange={handleColorChange}
            />
          </div>
        </div>
      </div>
      <div className='options'>
        <h1>Other</h1>
      </div>
    </Wrapper>
  );
};
export default ThemeSettingsPage;

const Wrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
  }

  .color {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  label {
    font-size: var(--small-font);
  }

  input[type='color'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    appearance: none;
    width: 40px;
    height: 40px;
    background-color: transparent;
    transition: transform 0.1s ease;
    cursor: pointer;
  }
  input[type='color']::-webkit-color-swatch {
    border-radius: var(--border-radius);
    border: 1px solid var(--accent-color);
  }
  input[type='color']::-webkit-color-swatch:hover {
    transform: scale(1.05);
  }
  input[type='color']::-moz-color-swatch {
    border-radius: var(--border-radius);
    border: 1px solid var(--accent-color);
  }
  input[type='color']::-moz-color-swatch:hover {
    transform: scale(1.05);
  }
`;
