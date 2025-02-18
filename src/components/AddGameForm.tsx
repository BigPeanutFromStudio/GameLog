import styled from 'styled-components';
import { useEffect, useCallback, FormEvent } from 'react';
import { game, states, AddGameFormProps } from '../types';
import { v6 as uuid } from 'uuid';
import NoImageFound from '../assets/NoImage.png';
import { useGameContext } from '../context/GameContext';

const AddGameForm = ({ setShowModal }: AddGameFormProps) => {
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

  const { addGame } = useGameContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    formJson.image = formJson.image ? formJson.image : NoImageFound;

    const game: game = {
      id: uuid(),
      name: formJson.name.toString(),
      state: states[formJson.state as keyof typeof states],
      image: formJson.image.toString(),
      rating: parseFloat(formJson.rating.toString()),
      platform: formJson.platform.toString(),
    };
    addGame(game);
    setShowModal(false);
  };

  return (
    <Wrapper>
      <div className='form'>
        <h1>ADD A GAME</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <label htmlFor='name'>Game name: </label>
            <input
              type='text'
              name='name'
              required
              placeholder='Enter the name...'
            />
            <label htmlFor='platform'>Platform name: </label>
            <input
              type='text'
              name='platform'
              placeholder='Enter the platform...'
            />
            <label htmlFor='state'>Game status: </label>
            <select name='state' defaultValue={states.Queued}>
              <optgroup>
                {Object.keys(states).map((key, index) => (
                  <option key={index} value={key}>
                    {Object.values(states)[index]}
                  </option>
                ))}
              </optgroup>
            </select>
            <label htmlFor='rating'>Game rating: </label>
            <input type='number' step='0.01' name='rating' defaultValue='0' />
            <label htmlFor='image'>Cover image: </label>
            <input type='text' name='image' placeholder='Image url (460x215)' />
          </div>
          <button type='submit'>Add game</button>
        </form>
      </div>
    </Wrapper>
  );
};
export default AddGameForm;

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
  .input-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .input-wrapper label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--small-font);
  }
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
    font-size: var(--large-font);
    border-bottom: solid 1px var(--accent-color);
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  input,
  select,
  button {
    all: unset;
    display: block;
    background-color: var(--primary-color);
    width: 400px;
    border-radius: var(--border-radius);
    padding: 20px;
    margin: 10px;
    font-size: var(--small-font);
  }
  button {
    cursor: pointer;
    text-align: center;
  }
  button:hover {
    background-color: var(--secondary-color);
  }
`;
