import styled from 'styled-components';
import { SelectProps } from '../../types';

const Select = ({ value, onChange, name, minWidth, options }: SelectProps) => {
  return (
    <Wrapper min_width={minWidth}>
      <select name={name} value={value ?? ''} onChange={onChange}>
        <optgroup>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      </select>
    </Wrapper>
  );
};
export default Select;

const Wrapper = styled.div<{ min_width?: string }>`
  min-height: 50px;
  min-width: ${(props) => props.min_width ?? '100px'};
  user-select: none;
  select {
    all: unset;
    background-color: var(--primary-color);
    min-width: inherit;
    min-height: inherit;
    text-align: center;
    border-radius: var(--border-radius);
    padding: 10px;
    font-size: var(--small-font);
    cursor: pointer;
    line-height: 2.2;
  }
  select:hover,
  select:focus {
    transform: scale(1.02);
  }
`;
