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


export interface IChatInterfacesViewGroupActionExtraProps { };

const ChatInterfacesViewGroupActionExtra = React.memo((props: IChatInterfacesViewGroupActionExtraProps) => {
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

export default ChatInterfacesViewGroupActionExtra;