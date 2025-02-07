import styled from 'styled-components';
import { useEffect, useCallback, useContext, FormEvent } from 'react';
import { game, states, GameContextType } from '../types';
import { GameContext } from '../main';
import { v6 as uuid } from 'uuid';
import NoImageFound from '../assets/NoImage.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddGameForm = ({ setShowModal }: any) => {
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

  const gameContext = useContext(GameContext);
  if (!gameContext) {
    console.log('Something went wrong with the context');
    return null;
  }
  const { addGame }: GameContextType = gameContext;

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
    };
    addGame(game);
    setShowModal(false);
  };

  return (
    <Wrapper>
      <div className='form'>
        <h1>ADD A GAME</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' required placeholder='Game name...' />
          <select name='state' defaultValue={states.Queued}>
            <optgroup>
              {Object.keys(states).map((key, index) => (
                <option key={index} value={key}>
                  {Object.values(states)[index]}
                </option>
              ))}
            </optgroup>
          </select>
          <input type='number' step='0.01' name='rating' defaultValue='0' />
          <input type='text' name='image' placeholder='Image url (460x215)' />
          <button type='submit'>Add game</button>
        </form>
      </div>
    </Wrapper>
  );
};
export default AddGameForm;

const Wrapper = styled.div`
  position: absolute;
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
    background-color: var(--primary-color);
    border-radius: 10px;
    width: 600px;
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
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  input {
    all: unset;
    display: block;
    background-color: var(--secondary-color);
    width: 400px;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    font-size: 1.3rem;
  }
  select {
    all: unset;
    display: block;
    background-color: var(--secondary-color);
    width: 400px;
    border-radius: 20px;
    padding: 20px;
    margin: 20px;
    font-size: 1.3rem;
    cursor: pointer;
  }
  button {
    all: unset;
    width: 400px;
    background-color: var(--secondary-color);
    padding: 20px;
    border-radius: 20px;
    font-size: 1.5rem;
    text-align: center;
    cursor: pointer;
  }
  button:hover {
    background-color: var(--background-color);
  }
`;
