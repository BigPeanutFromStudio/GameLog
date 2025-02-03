import styled from 'styled-components';
import { states } from '../types';

const Navbar = () => {
  return (
    <Wrapper>
      <div>
        <label>Name:</label>
        <input type='text' required placeholder='Enter game name...' />
      </div>
      <div>
        <label>Image:</label>
        <input type='text' placeholder='Cover image url (460x215)' />
      </div>
      <div>
        <label>State:</label>
        <select>
          {Object.keys(states).map((key, index) => (
            <option key={index} value={key}>
              {Object.values(states)[index]}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>Add Game</button>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.div`
  user-select: none;
  width: 100%;
  height: 100px;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  label {
    font-size: 2rem;
    padding-right: 10px;
  }
  input {
    all: unset;
    width: 400px;
    height: 50px;
    background-color: var(--secondary-color);
    border-radius: 10px;
    font-size: 1.8rem;
    padding: 10px;
  }
  select {
    all: unset;
    width: 200px;
    height: 50px;
    background-color: var(--secondary-color);
    border-radius: 10px;
    font-size: 1.8rem;
    padding: 10px;
    text-align: center;
  }
  button {
    all: unset;
    position: absolute;
    width: 100px;
    height: 50px;
    top: 20px;
    right: 20px;
    background-color: var(--secondary-color);
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    font-size: 1.3rem;
    cursor: pointer;
    user-select: none;
  }
  button:hover {
    background-color: var(--background-color);
    box-shadow: inset 8px 8px 24px 0px rgba(66, 68, 90, 1);
  }
  button:active {
    box-shadow: inset 15px 15px 24px 3px rgba(66, 68, 90, 1);
  }
`;
