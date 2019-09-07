import * as React from 'react';

import {
  SettingsWrapper,
  SettingsMain,
} from './style';
import SettingsNav from './nav/SettingsNav';
import SettingsView from './view/SettingsView';


export interface ISettingsProps { };
export interface ISettingsState { }


const Settings = React.memo((props: ISettingsProps) => {
  return (
    <SettingsWrapper>
      <SettingsMain>
        {/* 导航区块 */}
        <SettingsNav />

        {/* 视图区块 */}
        <SettingsView />
      </SettingsMain>
    </SettingsWrapper>
  );
});

export default Settings;