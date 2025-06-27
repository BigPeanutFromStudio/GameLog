import styled from 'styled-components';
import ImportButton from '../components/ImportButton';
import ExportButton from '../components/ExportButton';

const SettingsMenu = () => {
  return (
    <Wrapper>
      <h1 className='section-h1'>Data Options</h1>
      <ImportButton />
      <div className='export-buttons'>
        <ExportButton saveMode={0} />
        <ExportButton saveMode={1} />
        <ExportButton saveMode={3} />
      </div>
    </Wrapper>
  );
};
export default SettingsMenu;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-bottom: 50px;
  label {
    font-size: var(--small-font);
  }
  .tab-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    margin-bottom: 50px;
    gap: 50px;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }
  .tab {
    cursor: pointer;
    transition: transform 0.1s ease;
    font-size: var(--small-font);
  }
  .tab:hover {
    transform: scale(1.1);
  }
  .active {
    transform: scale(1.1);
    background-color: var(--secondary-color);
  }
  .link {
    text-decoration: none;
    color: var(--text-color);
  }
`;
