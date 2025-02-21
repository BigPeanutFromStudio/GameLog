import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSettingsContext } from '../context/SettingsContext';
import { themes } from '../context/SettingsContext';
import { defaultTheme } from '../theme/defaultTheme';
import ThemeSettings from '../components/ThemeSettings';
import { MdNavigateBefore } from 'react-icons/md';
import DataSettings from '../components/DataSettings';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const SettingsMenu = () => {
  const { theme, setTheme, saveTheme } = useSettingsContext();

  const [colors, setColors] = useState(theme.colors);
  const [fonts, setFonts] = useState(theme.fontSizes);
  const [font, setFont] = useState(theme.font);
  const [borderRadius, setBorderRadius] = useState(theme.borderRadius);

  useEffect(() => {
    setColors(theme.colors);
    setFonts(theme.fontSizes);
    setBorderRadius(theme.borderRadius);
    setFont(theme.font);
  }, [theme]);

  const handleThemeChange = (theme: typeof defaultTheme) => {
    setTheme(theme);
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFont(value);
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
      font: font,
    };
    setTheme(currentTheme);
  };

  const handleSaveTheme = () => {
    const currentTheme = {
      ...theme,
      colors: colors,
      fontSizes: fonts,
      borderRadius: borderRadius,
      font: font,
    };
    saveTheme(currentTheme);
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
      handleSaveTheme={handleSaveTheme}
      handleFontFamilyChange={handleFontFamilyChange}
      font={font}
    />,
    <DataSettings />,
  ];

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Wrapper>
      <div className='tab-switch'>
        <Link className='link' to='/'>
          <Button icon={<MdNavigateBefore size={35} />} onClick={() => {}} />
        </Link>
        {tabs.map((tab, index) => (
          <Button
            key={tab}
            onClick={() => setCurrentTab(index)}
            icon={<h1>{tab}</h1>}
            className={currentTab === index ? 'tab active' : 'tab'}
          />
        ))}
      </div>
      {tabElements[currentTab]}
    </Wrapper>
  );
};
export default SettingsMenu;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-bottom: 50px;
  label {
    font-size: var(--small-font);
  }
  .tab-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    margin-bottom: 50px;
    gap: 50px;
  }
  .tab {
    cursor: pointer;
    transition: transform 0.1s ease;
    font-size: var(--small-font);
  }
  .tab:hover {
    transform: scale(1.1);
  }
  .active {
    transform: scale(1.1);
    background-color: var(--secondary-color);
  }
  .link {
    text-decoration: none;
    color: var(--text-color);
  }
`;
