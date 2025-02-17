import styled from 'styled-components';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';

const DataSettings = () => {
  return (
    <Wrapper>
      <ImportButton />
      <ExportButton />
      <h1 className='section-h1'>Data Export Options</h1>
      <div className='checkboxes'>
        <label htmlFor='games'>Games: </label>
        <input type='checkbox' name='games' />
        <label htmlFor='settings'>Preferences: </label>
        <input type='checkbox' name='settings' />
        <label htmlFor='theme'>Theme: </label>
        <input type='checkbox' name='theme' />
      </div>
    </Wrapper>
  );
};
export default DataSettings;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    all: unset;
    border-bottom: none;
    font-size: var(--medium-font);
  }
  input[type='checkbox'] {
    all: unset;
    border: 1px solid var(--accent-color);
    width: 50px;
    height: 50px;
    background-color: var(--secondary-color);
    cursor: pointer;
  }
  input[type='checkbox']:checked {
    background-color: var(--accent-color);
  }
  .section-h1 {
    font-size: var(--medium-font);
    text-align: center;
    border-bottom: solid 1px var(--accent-color);
    margin-bottom: 30px;
    margin-top: 15px;
  }
`;
