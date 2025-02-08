import styled from 'styled-components';
import { useEffect, useCallback, useContext, FormEvent } from 'react';
import { game, states, GameContextType, EditGameFormProps } from '../types';
import { GameContext } from '../main';
import NoImageFound from '../assets/NoImage.png';

const EditGameForm = ({ setShowModal, game }: EditGameFormProps) => {
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
  const { updateGame }: GameContextType = gameContext;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    formJson.image = formJson.image ? formJson.image : NoImageFound;

    const updatedGame: game = {
      id: game.id,
      name: formJson.name.toString(),
      state: states[formJson.state as keyof typeof states],
      image: formJson.image.toString(),
      rating: parseFloat(formJson.rating.toString()),
    };
    updateGame(updatedGame);
    setShowModal(false);
  };

  return (
    <Wrapper>
      <div className='form'>
        <h1>Edit {game.name}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            required
            placeholder='Game name...'
            defaultValue={game.name}
          />
          <select name='state' defaultValue={game.state}>
            <optgroup>
              {Object.keys(states).map((key, index) => (
                <option key={index} value={key}>
                  {Object.values(states)[index]}
                </option>
              ))}
            </optgroup>
          </select>
          <input
            type='number'
            step='0.01'
            name='rating'
            defaultValue={game.rating}
          />
          <input
            type='text'
            name='image'
            defaultValue={game.image}
            placeholder='Image url (460x215)'
          />
          <button type='submit'>Edit game</button>
        </form>
      </div>
    </Wrapper>
  );
};
export default EditGameForm;

const Wrapper = styled.div`
  position: absolute;
  z-index: 2000;
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
