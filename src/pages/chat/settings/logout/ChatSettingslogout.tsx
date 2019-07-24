import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  LogoutWrapper,
  LogoutMain,
  LogoutMainTitle,
  LogoutMainTitleText,
  LogoutMainContent,
  LogoutMainContentText,
} from './style';


export interface IChatSettingsLogoutProps { };

const ChatSettingsLogout = React.memo((props: IChatSettingsLogoutProps) => {
  return (
    <LogoutWrapper>
      <LogoutMain>
        <LogoutMainTitle>
          <LogoutMainTitleText>
            退出登录
          </LogoutMainTitleText>
        </LogoutMainTitle>
        <LogoutMainContent>
          <LogoutMainContentText>
            <Button
              type="danger"
            >Logout</Button>
          </LogoutMainContentText>
        </LogoutMainContent>
      </LogoutMain>
    </LogoutWrapper>
  );
});

export default ChatSettingsLogout;