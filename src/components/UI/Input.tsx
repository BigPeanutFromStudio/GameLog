import styled from 'styled-components';
import { InputProps } from '../../types';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  minWidth,
}: InputProps) => {
  return (
    <Wrapper min_width={minWidth}>
      <input
        type={type}
        name={name}
        placeholder={placeholder ?? ''}
        value={value ?? ''}
        onChange={onChange}
      />
    </Wrapper>
  );
};
export default Input;

const Wrapper = styled.div<{ min_width?: string }>`
  min-height: 50px;
  min-width: ${(props) => props.min_width ?? '200px'};
  input {
    all: unset;
    background-color: var(--primary-color);
    min-height: inherit;
    min-width: inherit;
    padding: 10px;
    border-radius: var(--border-radius);
    font-size: var(--small-font);
    transition: transform 0.1s ease;
    cursor: text;
  }
  input:hover,
  input:focus {
    transform: scale(1.02);
  }
`;
