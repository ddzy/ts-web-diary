import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  FriendWrapper,
  FriendMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from 'components/widget/base_pin_item/BasePinItem.types';


export interface IBasePinItemTitleActionFriendProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'user_is_attention' | 'user_is_current_author' | 'user_is_friend'>;
};
export interface IBasePinItemTitleActionFriendState { }


const BasePinItemTitleActionFriend = React.memo((props: IBasePinItemTitleActionFriendProps) => {
  return (
    <FriendWrapper>
      <FriendMain>
        <Button
          type="ghost"
          size="small"
          icon={
            props.pinInfo.user_is_friend ? 'message' : 'plus'
          }
          disabled={
            props.pinInfo.user_is_current_author
              ? true
              : false
          }
        >
          {
            props.pinInfo.user_is_friend ? '去聊天' : '加好友'
          }
        </Button>
      </FriendMain>
    </FriendWrapper>
  );
});

export default BasePinItemTitleActionFriend;