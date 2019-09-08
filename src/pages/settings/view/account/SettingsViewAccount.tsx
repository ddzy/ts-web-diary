import * as React from 'react';
import {
  Empty,
} from 'antd';

import {
  AccountWrapper,
  AccountMain,
} from './style';


export interface ISettingsViewAccountProps { };
export interface ISettingsViewAccountState { }


const SettingsViewAccount = React.memo((props: ISettingsViewAccountProps) => {
  return (
    <AccountWrapper>
      <AccountMain>
        <Empty
          description="Keep working..."
        />
      </AccountMain>
    </AccountWrapper>
  );
});

export default SettingsViewAccount;