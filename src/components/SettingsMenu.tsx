import styled from 'styled-components';
import { useEffect, useCallback, useState } from 'react';
import { SettingsMenuProps } from '../types';
import { useSettingsContext } from '../context/SettingsContext';
import { themes } from '../context/SettingsContext';
import { defaultTheme } from '../theme/defaultTheme';
import ThemeSettings from './ThemeSettings';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import DataSettings from './DataSettings';

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

  const tabs = ['Theme Settings', 'Data Settings'];
  const tabElements = [
    <ThemeSettings
      themes={themes}
      theme={theme}
      handleThemeChange={handleThemeChange}
      handleColorChange={handleColorChange}
      handleFontChange={handleFontChange}
      handleBorderRadiusChange={handleBorderRadiusChange}
      colors={colors}
      fonts={fonts}
      borderRadius={borderRadius}
      handleSubmit={handleSubmit}
    />,
    <DataSettings />,
  ];

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Wrapper>
      <div className='form'>
        <div className='tab-switch'>
          <div
            className='prev'
            onClick={() =>
              setCurrentTab((currentTab - 1 + tabs.length) % tabs.length)
            }
          >
            <MdNavigateBefore size={35} />
          </div>
          <h1>{tabs[currentTab]}</h1>
          <div
            className='next'
            onClick={() =>
              setCurrentTab((currentTab + 1 + tabs.length) % tabs.length)
            }
          >
            <MdNavigateNext size={35} />
          </div>
        </div>
        {tabElements[currentTab]}
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
  .tab-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  .prev,
  .next {
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  .prev:hover,
  .next:hover {
    transform: scale(1.3);
  }
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
  .tab-switch h1 {
    margin-bottom: 30px;
    margin-top: 15px;
    font-size: var(--large-font);
    border-bottom: solid 1px var(--accent-color);
  }
  .form label {
    font-size: var(--small-font);
    margin-left: 15px;
  }

`;
