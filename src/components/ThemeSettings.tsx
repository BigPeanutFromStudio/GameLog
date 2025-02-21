import styled from 'styled-components';
import { useSettingsContext } from '../context/SettingsContext';
import { ThemeSettingsProps } from '../types';
import ScaleButton from './ScaleButton';
import ThemeTabs from './ThemeTabs';
import Button from './UI/Button';
import Select from './UI/Select';
import Input from './UI/Input';

const ThemeSettings = ({
  themes,
  theme,
  handleThemeChange,
  handleColorChange,
  handleFontChange,
  handleBorderRadiusChange,
  handleSubmit,
  colors,
  fonts,
  borderRadius,
  handleSaveTheme,
  handleFontFamilyChange,
  font,
}: ThemeSettingsProps) => {
  const { cardScale, setCardScale } = useSettingsContext();
  const fontFamilies = [
    'Lexend',
    'Oswald',
    'Roboto',
    'Inter',
    'Funnel Display',
  ];
  return (
    <Wrapper>
      <div className='buttons'>
        <Button icon={<h1>Apply Changes</h1>} onClick={handleSubmit} />
        <Button icon={<h1>Save Custom Theme</h1>} onClick={handleSaveTheme} />
      </div>
      <div className='settings'>
        <div className='themes'>
          <h1>Themes</h1>
          <ThemeTabs
            themes={themes}
            theme={theme}
            handleThemeChange={handleThemeChange}
          />
        </div>
        <div className='colors'>
          <h1>Colors</h1>
          <div className='category'>
            <div className='group'>
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
            </div>
            <div className='group'>
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
          </div>
        </div>
        <div className='fonts'>
          <h1>Font</h1>
          <div className='category'>
            <div className='group'>
              <label htmlFor='family'>Font Family: </label>
              <Select
                name='family'
                value={font}
                onChange={handleFontFamilyChange}
                options={fontFamilies.map((fontFamily) => ({
                  value: fontFamily,
                  label: fontFamily,
                }))}
              />
            </div>
            <div className='group'>
              <label htmlFor='small'>Small: </label>
              <Input
                type='text'
                name='small'
                value={fonts.small}
                onChange={handleFontChange}
                minWidth='100px'
              />
              <label htmlFor='medium'>Medium: </label>
              <Input
                type='text'
                name='medium'
                value={fonts.medium}
                onChange={handleFontChange}
                minWidth='100px'
              />
              <label htmlFor='large'>Large: </label>
              <Input
                type='text'
                name='large'
                value={fonts.large}
                onChange={handleFontChange}
                minWidth='100px'
              />
              <label htmlFor='xlarge'>XLarge: </label>
              <Input
                type='text'
                name='xlarge'
                value={fonts.xlarge}
                onChange={handleFontChange}
                minWidth='100px'
              />
            </div>
          </div>
        </div>
        <div className='other'>
          <h1>Other Settings</h1>
          <div className='category'>
            <div className='group'>
              <label htmlFor='borderRadius'>Border Radius: </label>
              <Input
                type='text'
                name='borderRadius'
                value={borderRadius}
                onChange={handleBorderRadiusChange}
                minWidth='100px'
              />
            </div>
            <div className='group'>
              <label>Card Size: </label>
              <ScaleButton cardScale={cardScale} setCardScale={setCardScale} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default ThemeSettings;

const Wrapper = styled.div`
  height: 100%;
  width: 90%;
  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
  .settings {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .themes {
    max-width: 100%;
  }

  .category {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .group {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    gap: 10px;
    max-width: 100%;
  }
  .themes h1,
  .other h1,
  .colors h1,
  .fonts h1 {
    font-size: var(--large-font);
    text-align: center;
    border-bottom: solid 1px var(--accent-color);
    margin-bottom: 30px;
    margin-top: 15px;
  }

  label {
    line-height: 2.2;
  }
  input[type='color'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    appearance: none;
    width: 70px;
    height: 70px;
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
