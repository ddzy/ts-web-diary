import * as React from 'react';

import {
  SettingsWrapper,
  SettingsMain,
  SettingsMainList,
  SettingsMainItem,
} from './style';
import ChatSettingsMessageTip from './message-tip/ChatSettingsMessageTip';
import ChatSettingslogout from './logout/ChatSettingslogout';


export interface IChatSettingsProps {

};

const ChatSettings = React.memo((props: IChatSettingsProps) => {
  return (
    <SettingsWrapper>
      <SettingsMain>
        <SettingsMainList>
          <SettingsMainItem>
            {/* 新消息通知 */}
            <ChatSettingsMessageTip />
          </SettingsMainItem>
          <SettingsMainItem>
            {/* 注销登录 */}
            <ChatSettingslogout />
          </SettingsMainItem>
        </SettingsMainList>
      </SettingsMain>
    </SettingsWrapper>
  );
});

export default ChatSettings;