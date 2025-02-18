import styled from 'styled-components';
import { ThemeTabsProps } from '../types';
import { useSettingsContext } from '../context/SettingsContext';

const ThemeTabs = ({ handleThemeChange, themes, theme }: ThemeTabsProps) => {
  const { savedTheme } = useSettingsContext();
  return (
    <Wrapper>
      <div className='preset-tabs'>
        <div
          className={`preset-tab ${
            theme === themes.default ? 'selected-tab' : ''
          }`}
          onClick={() => handleThemeChange(themes.default)}
        >
          Choco
        </div>
        <div
          className={`preset-tab ${
            theme === themes.preset1 ? 'selected-tab' : ''
          }`}
          onClick={() => handleThemeChange(themes.preset1)}
        >
          Midnight
        </div>
        <div
          className={`preset-tab ${
            theme === themes.preset2 ? 'selected-tab' : ''
          }`}
          onClick={() => handleThemeChange(themes.preset2)}
        >
          Light
        </div>
        <div
          className={`preset-tab ${
            theme === themes.preset3 ? 'selected-tab' : ''
          }`}
          onClick={() => handleThemeChange(themes.preset3)}
        >
          Dark
        </div>
        <div
          className={`preset-tab ${theme === savedTheme ? 'selected-tab' : ''}`}
          onClick={() => handleThemeChange(savedTheme)}
        >
          Custom
        </div>
      </div>
    </Wrapper>
  );
};
export default ThemeTabs;

const Wrapper = styled.div`
  .preset-tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }
  .preset-tab {
    width: 200px;
    height: 100px;
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    font-size: var(--medium-font);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.1s ease;
    cursor: pointer;
  }
  .preset-tab:hover {
    transform: scale(1.1);
  }
  .selected-tab {
    background-color: var(--secondary-color);
  }
`;
