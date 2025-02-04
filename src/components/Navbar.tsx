import styled from 'styled-components';

const Navbar = () => {
  return <Wrapper></Wrapper>;
};
export default Navbar;

const Wrapper = styled.div`
  user-select: none;
  width: 100%;
  height: 100px;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;
