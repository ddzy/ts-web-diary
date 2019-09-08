import * as React from 'react';
import {
  Empty,
} from 'antd';

import {
  PasswordWrapper,
  PasswordMain,
} from './style';


export interface ISettingsViewPasswordProps { };
export interface ISettingsViewPasswordState { }


const SettingsViewPassword = React.memo((props: ISettingsViewPasswordProps) => {
  return (
    <PasswordWrapper>
      <PasswordMain>
        <Empty
          description="Keep working..."
        />
      </PasswordMain>
    </PasswordWrapper>
  );
});

export default SettingsViewPassword;