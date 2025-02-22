import styled from 'styled-components';
import ThemeSettings from '../components/ThemeSettings';
import { MdNavigateBefore } from 'react-icons/md';
import DataSettings from '../components/DataSettings';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { useState } from 'react';

const SettingsMenu = () => {
  const tabs = ['Visual Settings', 'Data Settings'];
  const tabElements = [<ThemeSettings />, <DataSettings />];

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Wrapper>
      <div className='tab-switch'>
        <Link className='link' to='/'>
          <Button icon={<MdNavigateBefore size={35} />} onClick={() => {}} />
        </Link>
        {tabs.map((tab, index) => (
          <Button
            key={tab}
            onClick={() => setCurrentTab(index)}
            icon={<h1>{tab}</h1>}
            className={currentTab === index ? 'tab active' : 'tab'}
          />
        ))}
      </div>
      {tabElements[currentTab]}
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
