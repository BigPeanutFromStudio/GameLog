import styled from 'styled-components';
import { useSettingsContext } from '../context/SettingsContext';
import { ThemeSettingsProps } from '../types';
import ScaleButton from './ScaleButton';
import ThemeTabs from './ThemeTabs';

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
}: ThemeSettingsProps) => {
  const { cardScale, setCardScale } = useSettingsContext();
  return (
    <Wrapper>
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
        <div className='other-options'>
          <label htmlFor='borderRadius'>Border Radius: </label>
          <input
            type='text'
            name='borderRadius'
            value={borderRadius}
            onChange={handleBorderRadiusChange}
          />
          <label>Card Size: </label>
          <ScaleButton cardScale={cardScale} setCardScale={setCardScale} />
          <button onClick={handleSubmit}>Apply Changes</button>
        </div>
      </div>
    </Wrapper>
  );
};
export default ThemeSettings;

const Wrapper = styled.div`
  .other h1,
  .colors h1,
  .fonts h1 {
    font-size: var(--medium-font);
    text-align: center;
    border-bottom: solid 1px var(--accent-color);
    margin-bottom: 30px;
    margin-top: 15px;
  }
  .other-options label {
    margin-right: 5px;
  }
  .other-options {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .other-options h1 {
    all: unset;
    font-size: var(--small-font);
  }
  button {
    all: unset;
    width: 150px;
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
