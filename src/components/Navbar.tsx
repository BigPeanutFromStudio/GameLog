import { useEffect, useMemo, useState } from 'react';
import { IoMdClose, IoMdHome, IoMdMenu, IoMdSettings } from 'react-icons/io';
import styled from 'styled-components';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { themes, useSettingsContext } from '../context/SettingsContext';
import { FaGithub, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';
import {
  filterOption,
  sortOption,
  categorizeOption,
  themeOption,
} from '../types';
import { FaBluesky } from 'react-icons/fa6';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filterOptions: filterOption[] = useMemo(
    () => [
      { value: '100%', label: '100%', color: 'var(--finished-fully-color)' },
      { value: 'Finished', label: 'Finished', color: 'var(--finished-color)' },
      { value: 'Playing', label: 'Playing', color: 'var(--playing-color)' },
      { value: 'Queued', label: 'Queued', color: 'var(--queued-color)' },
      {
        value: 'Abandoned',
        label: 'Abandoned',
        color: 'var(--abandoned-color)',
      },
    ],
    []
  );
  const sortOptions: sortOption[] = useMemo(
    () => [
      { value: 'byname', label: 'Name' },
      { value: 'byreview', label: 'Rating' },
    ],
    []
  );
  const categorizeOptions: categorizeOption[] = useMemo(
    () => [
      { value: 'none', label: 'None' },
      { value: 'state', label: 'State' },
      { value: 'platform', label: 'Platform' },
    ],
    []
  );
  const themeOptions: themeOption[] = useMemo(
    () => [
      { value: 'default', label: 'Chocolatey' },
      { value: 'preset1', label: 'Midnight' },
      { value: 'preset2', label: 'Light' },
      { value: 'preset3', label: 'Dark' },
      { value: 'custom', label: 'Custom' },
    ],
    []
  );

  const animatedComponents = makeAnimated();

  const filterStyles: StylesConfig<filterOption, true> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'var(--primary-color)',
      borderRadius: 'var(--border-radius)',
      border: 'none',
    }),
    option: (styles) => {
      return {
        ...styles,
        borderRadius: 'var(--border-radius)',
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--accent-color)',
        borderRadius: 'var(--border-radius)',
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      borderRadius: 'var(--border-radius)',
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };
  const singleStyles: StylesConfig<sortOption, true> = {
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

  const {
    filter,
    setFilter,
    sortMethod,
    setSortMethod,
    isAscending,
    setIsAscending,
    categorizeBy,
    setCategorizeBy,
    setCategorize,
    cardsPerRow,
    setCardsPerRow,
    theme,
    setTheme,
    savedTheme,
  } = useSettingsContext();

  const [currentFilters, setCurrentFilters] = useState<
    MultiValue<filterOption>
  >([]);

  const [currentSortOption, setCurrentSortOption] = useState<sortOption | null>(
    null
  );

  const [currentCategorizeOption, setCurrentCategorizeOption] =
    useState<categorizeOption | null>(null);

  const [currentTheme, setCurrentTheme] = useState<themeOption | null>(
    themeOptions[0]
  );

  useEffect(() => {
    const mappedFilters = filter.map(
      (f) =>
        filterOptions.find((option) => option.value === f) || {
          value: f,
          label: f,
          color: '#000',
        }
    );
    setCurrentFilters(mappedFilters);

    const mappedSortMethod = sortOptions.filter(
      (s) => s.value === sortMethod
    )[0];
    setCurrentSortOption(mappedSortMethod);

    const mappedCategorizeBy = categorizeOptions.filter(
      (c) => c.value === categorizeBy
    )[0];
    if (mappedCategorizeBy.value === 'none') {
      setCategorize(false);
      setCurrentCategorizeOption(categorizeOptions[0]);
    } else {
      setCategorize(true);
      setCurrentCategorizeOption(mappedCategorizeBy);
    }

    const mappedTheme = themeOptions.filter((t) => t.label === theme.name)[0];

    setCurrentTheme(mappedTheme);
  }, [
    filter,
    sortOptions,
    sortMethod,
    filterOptions,
    categorizeOptions,
    categorizeBy,
    setCategorize,
    themeOptions,
    theme,
  ]);

  const handleFilterChange = (multiValue: MultiValue<filterOption>) => {
    setCurrentFilters(multiValue);
    setFilter(multiValue.map((option) => option.value));
  };

  const handleChangeSort = (
    newValue: SingleValue<sortOption> | MultiValue<sortOption>
  ) => {
    if (!Array.isArray(newValue)) {
      setCurrentSortOption(newValue as sortOption | null);
      setSortMethod((newValue as sortOption)?.value ?? sortMethod);
    }
  };

  const handleChangeCategorizeBy = (
    newValue: SingleValue<sortOption> | MultiValue<sortOption>
  ) => {
    if (!Array.isArray(newValue)) {
      setCurrentCategorizeOption(newValue as sortOption | null);
      if ((newValue as sortOption)?.value === 'none') {
        setCategorize(false);
        setCategorizeBy((newValue as sortOption)?.value ?? sortMethod);
      } else {
        setCategorize(true);
        setCategorizeBy((newValue as sortOption)?.value ?? sortMethod);
      }
    }
  };

  const handleChangeTheme = (
    newValue: SingleValue<themeOption> | MultiValue<sortOption>
  ) => {
    if (!Array.isArray(newValue)) {
      setCurrentTheme(newValue as themeOption | null);
      if ((newValue as themeOption).value === 'custom') {
        setTheme(savedTheme);
      } else {
        const themeToSet = Object.keys(themes).find(
          (key) => key === (newValue as themeOption).value
        );
        setTheme(themes[themeToSet as keyof typeof themes]);
      }
    }
  };

  return (
    <Wrapper isSidebarOpen={isSidebarOpen}>
      <IoMdMenu
        className='icon-button'
        onClick={() => setIsSidebarOpen(true)}
        size={50}
      />
      <nav>
        <Link className='link' to='/'>
          <IoMdHome size={50} className='icon-button' />
        </Link>
        <Link className='link' to='/settings'>
          <IoMdSettings size={50} className='icon-button' />
        </Link>
      </nav>
      <div className='overlay'></div>
      <Sidebar isOpen={isSidebarOpen}>
        <div className='sidebar-content'>
          <div className='upper-part'>
            <IoMdClose
              className='icon-button delete-icon'
              size={50}
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className='middle-part'>
            <section>
              <h1 className='title'>Sort</h1>
              <div className='options'>
                <div className='group'>
                  <label>Card Per Row: </label>
                  <StyledSlider
                    value={cardsPerRow}
                    min={3}
                    max={8}
                    step={1}
                    onChange={(value) =>
                      setCardsPerRow(Array.isArray(value) ? value[0] : value)
                    }
                    renderTrack={Track}
                    renderThumb={Thumb}
                  />
                </div>
                <div className='group'>
                  <label htmlFor='sortby'>Sort by:</label>
                  <Select
                    styles={singleStyles}
                    name='sortby'
                    value={currentSortOption}
                    onChange={handleChangeSort}
                    options={sortOptions}
                    className='select'
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: 'var(--secondary-color)',
                        neutral0: 'var(--primary-color)',
                      },
                    })}
                  />
                  {isAscending ? (
                    <FaSortAmountUp
                      onClick={() => setIsAscending(false)}
                      className='icon-button'
                      size={25}
                    />
                  ) : (
                    <FaSortAmountDown
                      onClick={() => setIsAscending(true)}
                      className='icon-button'
                      size={25}
                    />
                  )}
                </div>
                <div className='group'>
                  <label htmlFor='categorizeby'>Group by:</label>
                  <Select
                    styles={singleStyles}
                    value={currentCategorizeOption}
                    name='categorizeby'
                    onChange={handleChangeCategorizeBy}
                    options={categorizeOptions}
                    className='select'
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: 'var(--secondary-color)',
                        neutral0: 'var(--primary-color)',
                      },
                    })}
                  />
                </div>
              </div>
            </section>
            <section>
              <h1 className='title'>Filter</h1>
              <div className='options'>
                <label htmlFor='filterselect'>Status:</label>
                <div className='group'>
                  <Select
                    components={animatedComponents}
                    styles={filterStyles}
                    options={filterOptions}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    value={currentFilters}
                    name='filterselect'
                    onChange={handleFilterChange}
                    className='select'
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: 'var(--secondary-color)',
                        neutral0: 'var(--primary-color)',
                      },
                    })}
                  />
                </div>
              </div>
            </section>
            <section>
              <h1 className='title'>Theme</h1>
              <div className='options'>
                <div className='group'>
                  <label htmlFor='theme'>Theme:</label>
                  <Select
                    name='theme'
                    value={currentTheme}
                    onChange={handleChangeTheme}
                    styles={singleStyles}
                    className='select'
                    options={themeOptions}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: 'var(--secondary-color)',
                        neutral0: 'var(--primary-color)',
                      },
                    })}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className='lower-part'>
            <a href='https://ko-fi.com/Z8Z31AXTR3' target='_blank'>
              <img
                className='icon-button'
                height='36'
                style={{ border: '0px', height: '36px' }}
                src='https://storage.ko-fi.com/cdn/kofi4.png?v=6'
                alt='Buy Me a Coffee at ko-fi.com'
              />
            </a>
            <FaGithub className='icon-button' size={50} />
            <FaBluesky className='icon-button' size={50} />
          </div>
        </div>
      </Sidebar>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.div<{ isSidebarOpen: boolean }>`
  height: 8vh;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .icon-button {
    cursor: pointer;
    transition: transform 0.1s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
  .overlay {
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .link {
    text-decoration: none;
    color: var(--text-color);
  }
  nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100vh;
  background-color: var(--background-color);
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    width: 100%;
  }

  .select {
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }

  .group {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .group .select {
    flex-grow: 1;
  }

  .sidebar-content {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .middle-part {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .lower-part {
    margin-top: auto;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .delete-icon {
    float: right;
  }
  .title {
    border-bottom: 2px solid var(--accent-color);
  }
  label {
    font-size: var(--small-font);
  }
`;

const StyledSlider = styled(ReactSlider)`
  width: 200px;
  height: 25px;
`;

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border-radius: 50%;
  cursor: grab;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Thumb = (props: any, state: any) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div<{ index: number }>`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2
      ? '#f00'
      : props.index === 1
      ? 'var(--primary-color)'
      : 'var(--accent-color)'};
  border-radius: 999px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Track = (props: any, state: any) => (
  <StyledTrack {...props} index={state.index} />
);
