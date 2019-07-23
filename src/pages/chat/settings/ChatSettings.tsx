import * as React from 'react';
import {
  Icon,
} from 'antd';

import {
  SettingsWrapper,
  SettingsMain,
} from './style';


export interface IChatSettingsProps {

};


export default function ChatSettings(props: IChatSettingsProps) {
  return (
    <SettingsWrapper>
      <SettingsMain>
        <Icon
          type="setting"
          theme="filled"
          style={{
            color: '#1da57a',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        />
      </SettingsMain>
    </SettingsWrapper>
  );
}