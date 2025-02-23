import { useEffect, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import styled from 'styled-components';
import Select, { MultiValue, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSettingsContext } from '../context/SettingsContext';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  interface filterOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  const filterOptions: filterOption[] = [
    { value: '100%', label: '100%', color: 'var(--finished-fully-color)' },
    { value: 'Finished', label: 'Finished', color: 'var(--finished-color)' },
    { value: 'Playing', label: 'Playing', color: 'var(--playing-color)' },
    { value: 'Queued', label: 'Queued', color: 'var(--queued-color)' },
    { value: 'Abandoned', label: 'Abandoned', color: 'var(--abandoned-color)' },
  ];

  const animatedComponents = makeAnimated();

  const colourStyles: StylesConfig<filterOption, true> = {
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

  const { filter, setFilter } = useSettingsContext();

  const [currentFilters, setCurrentFilters] = useState<
    MultiValue<filterOption>
  >([]);

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
  }, [filter]);

  const handleFilterChange = (multiValue: MultiValue<filterOption>) => {
    setCurrentFilters(multiValue);
    setFilter(multiValue.map((option) => option.value));
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
              <div className='content'>
                <div className='filter-options'>
                  <div className='filter-option'>
                    <Select
                      components={animatedComponents}
                      styles={colourStyles}
                      options={filterOptions}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      value={currentFilters}
                      onChange={handleFilterChange}
                      className='filter-select'
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
  height: 8%;
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

  .filter-select {
    background-color: var(--primary-color);
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
    padding: 10px;
  }
`;
