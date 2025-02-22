import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <div className='copyright'>
        <p>&copy; 2025</p>
        <p>Created by Piotr Bielański</p>
      </div>
      <div className='kofi'>
        <a href='https://ko-fi.com/Z8Z31AXTR3' target='_blank'>
          <img
            height='36'
            style={{ border: '0px', height: '36px' }}
            src='https://storage.ko-fi.com/cdn/kofi5.png?v=6'
            alt='Buy Me a Coffee at ko-fi.com'
          />
        </a>
      </div>
    </Wrapper>
  );
};
export default Footer;

const Wrapper = styled.div`
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 20px;
  background-color: var(--primary-color);
`;
