import * as React from 'react';
import {
  Switch,
  Icon,
} from 'antd';

import {
  MessageTipWrapper,
  MessageTipMain,
  MessageTipMainTitle,
  MessageTipMainTitleText,
  MessageTipMainContent,
  MessageTipMainContentText,
} from './style';


export interface IChatSettingsMessageTipProps { };

const ChatSettingsMessageTip = React.memo((props: IChatSettingsMessageTipProps) => {
  return (
    <MessageTipWrapper>
      <MessageTipMain>
        <MessageTipMainTitle>
          <MessageTipMainTitleText>
            新消息通知
          </MessageTipMainTitleText>
        </MessageTipMainTitle>
        <MessageTipMainContent>
          <MessageTipMainContentText>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked
            />
          </MessageTipMainContentText>
        </MessageTipMainContent>
      </MessageTipMain>
    </MessageTipWrapper>
  );
});

export default ChatSettingsMessageTip;