import styled from 'styled-components';
import { ButtonProps } from '../../types';

const Button = ({ icon, onClick }: ButtonProps) => {
  return (
    <Wrapper>
      <div className='container' onClick={onClick}>
        {icon}
      </div>
    </Wrapper>
  );
};
export default Button;

const Wrapper = styled.div`
  min-width: 50px;
  min-height: 50px;
  .container {
    position: relative;
    min-width: inherit;
    min-height: inherit;
    padding: 10px;
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1);
    transition: transform 0.1s ease;
    text-align: center;
  }
  .container:hover {
    transform: scale(1.05);
    transition: transform 0.1s ease;
  }
`;
