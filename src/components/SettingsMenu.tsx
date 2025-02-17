import styled from 'styled-components';
import { useEffect, useCallback, useState } from 'react';
import { SettingsMenuProps } from '../types';
import { useSettingsContext } from '../context/SettingsContext';
import { themes } from '../context/SettingsContext';
import { defaultTheme } from '../theme/defaultTheme';
import ThemeTabs from './ThemeTabs';

const SettingsMenu = ({ setShowModal }: SettingsMenuProps) => {
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

  const { theme, setTheme } = useSettingsContext();

  const [colors, setColors] = useState(theme.colors);
  const [fonts, setFonts] = useState(theme.fontSizes);
  const [borderRadius, setBorderRadius] = useState(theme.borderRadius);

  useEffect(() => {
    setColors(theme.colors);
    setFonts(theme.fontSizes);
    setBorderRadius(theme.borderRadius);
  }, [theme]);

  const handleThemeChange = (theme: typeof defaultTheme) => {
    setTheme(theme);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFonts((prevFonts) => ({
      ...prevFonts,
      [name]: value,
    }));
  };

  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBorderRadius(value);
  };

  const handleSubmit = () => {
    const currentTheme = {
      ...theme,
      colors: colors,
      fontSizes: fonts,
      borderRadius: borderRadius,
    };
    setTheme(currentTheme);
  };

  return (
    <Wrapper>
      <div className='form'>
        <h1>Settings</h1>
        <ThemeTabs
          themes={themes}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />
        <div className='colors'>
          <h1>Colors</h1>
          <label htmlFor='primary'>Primary Color: </label>
          <input
            type='color'
            name='primary'
            value={colors.primary}
            onChange={handleColorChange}
          />
          <label htmlFor='secondary'>Secondary Color: </label>
          <input
            type='color'
            name='secondary'
            value={colors.secondary}
            onChange={handleColorChange}
          />
          <label htmlFor='background'>Background Color: </label>
          <input
            type='color'
            name='background'
            value={colors.background}
            onChange={handleColorChange}
          />
          <label htmlFor='text'>Text Color: </label>
          <input
            type='color'
            name='text'
            value={colors.text}
            onChange={handleColorChange}
          />
          <label htmlFor='accent'>Accent Color: </label>
          <input
            type='color'
            name='accent'
            value={colors.accent}
            onChange={handleColorChange}
          />
        </div>
        <div className='fonts'>
          <h1>Font Sizes</h1>
          <label htmlFor='small'>Small: </label>
          <input
            type='text'
            name='small'
            value={fonts.small}
            onChange={handleFontChange}
          />
          <label htmlFor='medium'>Medium: </label>
          <input
            type='text'
            name='medium'
            value={fonts.medium}
            onChange={handleFontChange}
          />
          <label htmlFor='large'>Large: </label>
          <input
            type='text'
            name='large'
            value={fonts.large}
            onChange={handleFontChange}
          />
          <label htmlFor='xlarge'>XLarge: </label>
          <input
            type='text'
            name='xlarge'
            value={fonts.xlarge}
            onChange={handleFontChange}
          />
        </div>
        <div className='other'>
          <h1>Other Settings</h1>
          <label htmlFor='borderRadius'>Border Radius: </label>
          <input
            type='text'
            name='borderRadius'
            value={borderRadius}
            onChange={handleBorderRadiusChange}
          />
        </div>
        <button onClick={handleSubmit}>Apply Changes</button>
      </div>
    </Wrapper>
  );
};
export default SettingsMenu;

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
  .form {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    width: 90%;
    min-width: 600px;
    height: 900px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 8px 24px 8px #0f1014;
  }
  .form h1 {
    margin-bottom: 30px;
    margin-top: 15px;
    font-size: var(--large-font);
    border-bottom: solid 1px var(--accent-color);
  }
  .form label {
    font-size: var(--small-font);
    margin-left: 15px;
  }
  .other h1,
  .colors h1,
  .fonts h1 {
    font-size: var(--medium-font);
    text-align: center;
  }
  button {
    all: unset;
    width: 150px;
    margin-top: 15px;
    background-color: var(--primary-color);
    font-size: var(--small-font);
    border-radius: var(--border-radius);
    padding: 10px;
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  button:hover {
    transform: scale(1.1);
  }
  input {
    all: unset;
    margin-right: 30px;
    background-color: var(--primary-color);
    width: 100px;
    border-radius: var(--border-radius);
    padding: 10px;
    font-size: var(--small-font);
  }
  input[type='color'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 70px;
    height: 70px;
    background-color: transparent;
    cursor: pointer;
  }
  input[type='color']::-webkit-color-swatch {
    border-radius: var(--border-radius);
    border: 1px solid var(--accent-color);
  }
  input[type='color']::-moz-color-swatch {
    border-radius: var(--border-radius);
    border: 1px solid var(--accent-color);
  }
`;
