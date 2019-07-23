import * as React from 'react';

import {
  FriendsWrapper,
  FriendsMain,
} from './style';


export interface IChatFriendsProps {

};


export default function ChatFriends(props: IChatFriendsProps) {
  return (
    <FriendsWrapper>
      <FriendsMain>
        好友列表视图
      </FriendsMain>
    </FriendsWrapper>
  );
}