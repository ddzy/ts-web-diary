import * as React from 'react';
import {
  Icon,
} from 'antd';

import {
  ExtraWrapper,
  ExtraMain,
  ExtraMainEmoji,
  ExtraMainApplication,
} from './style';


export interface IChatInterfacesViewSingleActionExtraProps { };

const ChatInterfacesViewSingleActionExtra = React.memo((props: IChatInterfacesViewSingleActionExtraProps) => {
  return (
    <ExtraWrapper>
      <ExtraMain>
        <ExtraMainEmoji>
          <Icon
            type="smile"
            theme="filled"
            style={{
              color: '#1da57a',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          />
        </ExtraMainEmoji>
        <ExtraMainApplication>
          <Icon
            type="appstore"
            theme="filled"
            style={{
              color: '#1da57a',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          />
        </ExtraMainApplication>
      </ExtraMain>
    </ExtraWrapper>
  );
});

export default ChatInterfacesViewSingleActionExtra;