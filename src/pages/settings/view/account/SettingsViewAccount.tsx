import * as React from 'react';

import {
  AccountWrapper,
  AccountMain,
} from './style';
import SettingsViewAccountTitle from './title/SettingsViewAccountTitle';
import SettingsViewAccountEdit from './edit/SettingsViewAccountEdit';


export interface ISettingsViewAccountProps { };
export interface ISettingsViewAccountState { }


const SettingsViewAccount = React.memo((props: ISettingsViewAccountProps) => {
  return (
    <AccountWrapper>
      <AccountMain>
        {/* 标题区 */}
        <SettingsViewAccountTitle />

        {/* 编辑区 */}
        <SettingsViewAccountEdit />
      </AccountMain>
    </AccountWrapper>
  );
});

export default SettingsViewAccount;