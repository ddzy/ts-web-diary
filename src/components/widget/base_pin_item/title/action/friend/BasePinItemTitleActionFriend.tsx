import * as React from 'react';
import {
  Button,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  FriendWrapper,
  FriendMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';


export interface IBasePinItemTitleActionFriendProps extends RouteComponentProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'user_is_attention' | 'user_is_current_author' | 'user_is_friend'>;
};
export interface IBasePinItemTitleActionFriendState { }


const BasePinItemTitleActionFriend = React.memo((props: IBasePinItemTitleActionFriendProps) => {
  /**
   * [处理] - 开始聊天
   */
  function handleChat() {
    props.history.push('/chat');
  }

  /**
   * [处理] - 加好友
   */
  function handleMakeFriend() {
    // TODO
    // 待做...
  }

  return (
    <FriendWrapper>
      <FriendMain>
        <Button
          type="ghost"
          size="small"
          icon={
            props.pinInfo.user_is_friend ? 'message' : 'plus'
          }
          disabled={props.pinInfo.user_is_current_author}
          onClick={props.pinInfo.user_is_friend ? handleChat : handleMakeFriend}
        >
          {
            props.pinInfo.user_is_friend ? '去聊天' : '加好友'
          }
        </Button>
      </FriendMain>
    </FriendWrapper>
  );
});

export default withRouter(BasePinItemTitleActionFriend);