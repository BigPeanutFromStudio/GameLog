import styled from 'styled-components';
import { InputProps } from '../../types';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  minWidth,
  required,
}: InputProps) => {
  return (
    <Wrapper min_width={minWidth}>
      <input
        type={type}
        name={name}
        placeholder={placeholder ?? ''}
        value={value ?? ''}
        onChange={onChange}
        required={required ?? false}
      />
    </Wrapper>
  );
};
export default Input;

const Wrapper = styled.div<{ min_width?: string }>`
  min-height: 50px;
  min-width: ${(props) => props.min_width ?? '200px'};
  max-width: 50%;
  flex-grow: 1;
  input {
    all: unset;
    background-color: var(--primary-color);
    min-height: inherit;
    width: 100%;
    padding: 20px;
    border-radius: var(--border-radius);
    font-size: var(--small-font);
    transition: transform 0.1s ease;
    cursor: text;
    box-sizing: border-box;
  }
  input:hover,
  input:focus {
    transform: scale(1.02);
  }
`;
