import { useEffect, useMemo, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import styled from 'styled-components';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSettingsContext } from '../context/SettingsContext';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  interface filterOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  interface sortOption {
    readonly value: string;
    readonly label: string;
    readonly color?: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }

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
  const sortStyles: StylesConfig<sortOption, true> = {
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
  } = useSettingsContext();

  const [currentFilters, setCurrentFilters] = useState<
    MultiValue<filterOption>
  >([]);

  const [currentSortOption, setCurrentSortOption] = useState<sortOption | null>(
    null
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
  }, [filter, sortOptions, sortMethod, filterOptions]);

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

  return (
    <Wrapper isSidebarOpen={isSidebarOpen}>
      <IoMdMenu
        className='icon-button'
        onClick={() => setIsSidebarOpen(true)}
        size={50}
      />
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
              <h1 className='title'>Filter</h1>
              <div className='options'>
                <div className='option'>
                  <label htmlFor='filterselect'>Game status:</label>
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
              <h1 className='title'>Sort</h1>
              <div className='options'>
                <div className='option'>
                  <label htmlFor='sortby'>Sort by:</label>
                  <div className='group'>
                    <Select
                      styles={sortStyles}
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
                        className='icon icon-button'
                        size={25}
                      />
                    ) : (
                      <FaSortAmountDown
                        onClick={() => setIsAscending(true)}
                        className='icon icon-button'
                        size={25}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className='lower-part'></div>
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

  .select {
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
  }
  .option {
    padding: 10px;
  }

  .group {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .group .select {
    flex-grow: 1;
  }

  .icon {
    padding: 10px;
  }

  .sidebar-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
