import styled from 'styled-components';
import { useEffect, useCallback, FormEvent, useState, useRef } from 'react';
import { game, states, AddGameFormProps } from '../types';
import { v6 as uuid } from 'uuid';
import NoImageFound from '../assets/NoImage.png';
import { useGameContext } from '../context/GameContext';
import Button from './UI/Button';
import { FaFolderOpen } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';

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

  const [image, setImage] = useState<string>(NoImageFound);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLInputElement).value = '';
    inputFile.current?.click();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const imageToUse =
      image !== NoImageFound ? image : imageUrl ? imageUrl : NoImageFound;

    const game: game = {
      id: uuid(),
      name: formJson.name.toString(),
      state: states[formJson.state as keyof typeof states],
      image: imageToUse,
      rating: parseFloat(formJson.rating.toString()) || 0,
      platform: formJson.platform.toString(),
    };
    addGame(game);
    setShowModal(false);
  };

  return (
    <Wrapper>
      <div className='form'>
        <div className='close-button' onClick={() => setShowModal(false)}>
          <TiDelete size={40} />
        </div>
        <h1>Add a game</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <label htmlFor='name'>Game name: </label>
            <div className='input-group'>
              <input
                type='text'
                name='name'
                required
                placeholder='Enter the name...'
              />
            </div>
            <label htmlFor='platform'>Platform name: </label>
            <div className='input-group'>
              <input
                type='text'
                name='platform'
                placeholder='Enter the platform...'
                required
              />
            </div>
            <label htmlFor='state'>Game details: </label>
            <div className='input-group'>
              <select name='state' defaultValue={states.Queued} required>
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
                placeholder='Rating...'
              />
            </div>
            <label htmlFor='image'>Image: </label>
            <div className='input-group'>
              <input
                type='text'
                name='image'
                placeholder='Image url...'
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button onClick={handleClick} icon={<FaFolderOpen size={30} />}>
                <input
                  type='file'
                  name='imagefile'
                  accept='image/*'
                  onChange={handleFileChange}
                  ref={inputFile}
                />
              </Button>
            </div>
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
  .input-group {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .input-group input,
  .input-group select {
    flex: 1;
    width: 100%;
  }
  input[type='file'] {
    display: none;
  }
  .input-wrapper {
    display: grid;
    grid-template-columns: auto 500px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    max-width: 100%;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      grid-template-columns: auto 1fr;
    }
  }
  label {
    line-height: 2.2;
    font-size: var(--small-font);
  }
  .form {
    position: relative;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    min-width: 850px;
    padding: 20px;
    min-height: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 8px 24px 8px #0f1014;
    @media (max-width: 768px) {
      min-width: 90%;
      padding: 10px;
    }
  }
  .form h1 {
    margin-bottom: 30px;
    margin-top: 15px;
    font-size: var(--large-font);
    border-bottom: solid 1px var(--accent-color);
    @media (max-width: 768px) {
      font-size: var(--medium-font);
    }
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
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    padding: 20px;
    font-size: var(--small-font);
    transition: transform 0.1s ease;
  }
  select {
    cursor: pointer;
    text-align: center;
  }
  input:hover,
  input:focus,
  select:hover,
  select:focus {
    transform: scale(1.02);
  }
  button {
    cursor: pointer;
    text-align: center;
    transition: transform 0.1s ease;
  }
  button:hover {
    transform: scale(1.1);
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  .close-button:hover {
    transform: scale(1.1);
  }
`;
