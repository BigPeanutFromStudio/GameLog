import { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoIosAddCircle } from 'react-icons/io';
import styled from 'styled-components';
import AddGameForm from './AddGameForm';

const AddGameBtn = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Wrapper>
      <div className='container' onClick={() => setShowModal(!showModal)}>
        <IoIosAddCircle
          size={70}
          color='rgba(255, 255, 255, 0.4)'
          style={{ transform: 'inherit', transition: 'inherit' }}
        />
      </div>
      {showModal &&
        createPortal(
          <AddGameForm setShowModal={setShowModal} />,
          document.body
        )}
    </Wrapper>
  );
};
export default AddGameBtn;

const Wrapper = styled.div`
  width: 230px;
  height: 107px;
  margin-bottom: 10px;
  .container {
    position: relative;
    width: inherit;
    height: inherit;
    background-color: var(--primary-color);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1);
    transition: transform 0.5s ease;
  }
  img {
    border-radius: 10px;
    user-select: none;
  }
  .delete {
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 5px;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.1s ease;
  }
  .delete:hover {
    transform: scale(1.2);
    transition: transform 0.1s ease;
  }
  .container:hover {
    transform: scale(1.05);
    transition: transform 0.5s ease;
  }
`;
