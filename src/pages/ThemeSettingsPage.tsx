import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSettingsContext } from '../context/SettingsContext';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import { fontOption } from '../types';

const ThemeSettingsPage = () => {
  const { theme, setTheme, saveTheme } = useSettingsContext();

  const [colors, setColors] = useState(theme.colors);
  const [font, setFont] = useState<fontOption | null>(null);
  const [borderRadius, setBorderRadius] = useState(theme.borderRadius);

  const fontOptions: fontOption[] = useMemo(
    () => [
      { value: 'Lexend', label: 'Lexend' },
      { value: 'Oswald', label: 'Oswald' },
      { value: 'Roboto', label: 'Roboto' },
      { value: 'Inter', label: 'Inter' },
      { value: 'Funnel Display', label: 'Funnel Display' },
    ],
    []
  );

  useEffect(() => {
    setColors(theme.colors);
    setBorderRadius(theme.borderRadius);
    const mappedFont = fontOptions.find((f) => f.value === theme.font);
    setFont(mappedFont || fontOptions[0]);
  }, [theme, fontOptions]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  const handleFontFamilyChange = (
    newValue: SingleValue<fontOption> | MultiValue<fontOption>
  ) => {
    if (!Array.isArray(newValue)) {
      setFont(newValue as SingleValue<fontOption>);
    }
  };

  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBorderRadius(value);
  };

  const handleSubmit = () => {
    if (!font) return;
    const currentTheme = {
      ...theme,
      colors: colors,
      borderRadius: borderRadius,
      font: font.value,
    };
    setTheme(currentTheme);
  };

  const handleSaveTheme = () => {
    if (!font) return;
    const currentTheme = {
      ...theme,
      name: 'Custom',
      colors: colors,
      borderRadius: borderRadius,
      font: font.value,
    };
    saveTheme(currentTheme);
    setTheme(currentTheme);
  };

  const singleStyles: StylesConfig<fontOption, true> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'var(--primary-color)',
      borderRadius: 'var(--border-radius)',
      border: 'none',
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused
          ? 'var(--secondary-color)'
          : 'var(--primary-color)',
        color: 'var(--text-color)',
        borderRadius: 'var(--border-radius)',
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        borderRadius: 'var(--border-radius)',
        color: 'var(--text-color)',
      };
    },
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
        <div className='group'>
          <div className='other'>
            <label htmlFor='family'>Font Family: </label>
            <Select
              name='family'
              className='select'
              styles={singleStyles}
              value={font}
              onChange={handleFontFamilyChange}
              options={fontOptions}
            />
          </div>
          <div className='other'>
            <label htmlFor='borderRadius'>Border Radius:</label>
            <input
              type='text'
              value={borderRadius}
              onChange={handleBorderRadiusChange}
              name='borderRadius'
              className='border-input'
            />
          </div>
          <div className='other'>
            <input type='button' value='Apply Theme' onClick={handleSubmit} />
            <input
              type='button'
              value='Save Custom Theme'
              onClick={handleSaveTheme}
            />
          </div>
        </div>
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

  .color,
  .other {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .select {
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    width: 200px;
  }

  .border-input {
    all: unset;
    background-color: var(--primary-color);
    min-height: inherit;
    width: 100px;
    padding: 5px;
    border-radius: var(--border-radius);
    font-size: var(--small-font);
    transition: transform 0.1s ease;
    cursor: text;
    box-sizing: border-box;
  }

  .border-input:hover,
  .border-input:focus {
    transform: scale(1.02);
  }

  input[type='button'] {
    all: unset;
    background-color: var(--primary-color);
    min-height: inherit;
    padding: 5px;
    border-radius: var(--border-radius);
    font-size: var(--small-font);
    transition: transform 0.1s ease;
    cursor: pointer;
    box-sizing: border-box;
  }

  input[type='button']:hover,
  input[type='button']:hover {
    transform: scale(1.02);
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
