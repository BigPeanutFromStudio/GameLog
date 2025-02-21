import styled from 'styled-components';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';

const DataSettings = () => {
  return (
    <Wrapper>
      <h1 className='section-h1'>Data Export Options</h1>
      <ImportButton />
      <div className='export-buttons'>
        <ExportButton saveMode={0} />
        <ExportButton saveMode={1} />
        <ExportButton saveMode={3} />
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
  width: 90%;
  .export-buttons {
    display: flex;
    gap: 15px;
  }
  .section-h1 {
    font-size: var(--large-font);
    text-align: center;
    border-bottom: solid 1px var(--accent-color);
    margin-bottom: 30px;
    margin-top: 15px;
    width: 100%;
  }
`;
