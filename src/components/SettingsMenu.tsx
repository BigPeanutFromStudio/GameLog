import styled from 'styled-components';
import { useEffect, useCallback } from 'react';
import { SettingsMenuProps } from '../types';
import { useSettingsContext } from '../context/SettingsContext';
import { themes } from '../context/SettingsContext';

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

  const handleThemeChange = (
    theme: 'default' | 'preset1' | 'preset2' | 'preset3'
  ) => {
    setTheme(theme);
  };

  return (
    <Wrapper>
      <div className='form'>
        <h1>Settings</h1>
        <div className='preset-tabs'>
          <div
            className={`preset-tab ${
              theme === themes.default ? 'selected-tab' : ''
            }`}
            onClick={() => handleThemeChange('default')}
          >
            Default
          </div>
          <div
            className={`preset-tab ${
              theme === themes.preset1 ? 'selected-tab' : ''
            }`}
            onClick={() => handleThemeChange('preset1')}
          >
            Preset 1
          </div>
          <div
            className={`preset-tab ${
              theme === themes.preset2 ? 'selected-tab' : ''
            }`}
            onClick={() => handleThemeChange('preset2')}
          >
            Preset 2
          </div>
          <div
            className={`preset-tab ${
              theme === themes.preset3 ? 'selected-tab' : ''
            }`}
            onClick={() => handleThemeChange('preset3')}
          >
            Preset 3
          </div>
        </div>
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
    height: 800px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 8px 24px 8px #0f1014;
  }
  .form h1 {
    margin-bottom: 30px;
    margin-top: 15px;
  }
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
