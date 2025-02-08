import styled from 'styled-components';
import { NavbarProps, states } from '../types';
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import { MdCategory, MdOutlineCategory } from 'react-icons/md';

const Navbar = ({
  setSearch,
  setFilter,
  isAscending,
  setIsAscending,
  setSortMethod,
  setCategorize,
  categorize,
  sortMethod,
  filter,
}: NavbarProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value);
  };

  return (
    <Wrapper>
      <h1>Sort by:</h1>
      <div className='sort-container'>
        <select
          name='sort'
          defaultValue={sortMethod}
          onChange={handleSortChange}
        >
          <optgroup>
            <option value='byname'>Name</option>
            <option value='bystate'>State</option>
            <option value='byreview'>Review</option>
          </optgroup>
        </select>
        <div
          className='sort-style'
          onClick={() => setIsAscending(!isAscending)}
        >
          {isAscending ? (
            <FaSortAmountDownAlt size={30} />
          ) : (
            <FaSortAmountDown size={30} />
          )}
        </div>
        <div className='sort-style' onClick={() => setCategorize(!categorize)}>
          {categorize ? (
            <MdCategory size={30} />
          ) : (
            <MdOutlineCategory size={30} />
          )}
        </div>
      </div>
      <h1>Filter by:</h1>
      <select name='state' defaultValue={filter} onChange={handleFilterChange}>
        <optgroup>
          <option value='all'>All</option>
          {Object.keys(states).map((key, index) => (
            <option key={index} value={key}>
              {Object.values(states)[index]}
            </option>
          ))}
        </optgroup>
      </select>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search...'
          onChange={handleSearchChange}
        />
      </div>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.div`
  user-select: none;
  width: 100%;
  min-height: 100px;
  background-color: var(--background-color);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .search-bar {
    flex: 1;
  }
  input {
    all: unset;
    display: block;
    background-color: var(--primary-color);
    width: 80%;
    border-radius: 20px;
    padding: 20px;
    font-size: 1.3rem;
  }
  .sort-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
  }
  .sort-style {
    width: 32px;
    height: 32px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: var(--primary-color);
    cursor: pointer;
    margin-left: 5px;
  }
  h1 {
    margin-left: 15px;
  }
  select {
    all: unset;
    display: block;
    background-color: var(--primary-color);
    width: 150px;
    text-align: center;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
