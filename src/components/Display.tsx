import styled from 'styled-components';
import Card from './Card';
import { DisplayProps } from '../types';

const Display = ({ games }: DisplayProps) => {
  return (
    <Wrapper>
      {games.map((game) => (
        <Card game={game} />
      ))}
    </Wrapper>
  );
};
export default Display;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(460px, 1fr));
  gap: 10px;
  padding: 15px;
`;
