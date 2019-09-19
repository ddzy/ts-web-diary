import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  FriendWrapper,
  FriendMain,
} from './style';


export interface IBasePinItemTitleActionFriendProps { };
export interface IBasePinItemTitleActionFriendState { }


const BasePinItemTitleActionFriend = React.memo((props: IBasePinItemTitleActionFriendProps) => {
  return (
    <FriendWrapper>
      <FriendMain>
        <Button
          type="ghost"
          size="small"
          icon="plus"
        >加好友</Button>
      </FriendMain>
    </FriendWrapper>
  );
});

export default BasePinItemTitleActionFriend;