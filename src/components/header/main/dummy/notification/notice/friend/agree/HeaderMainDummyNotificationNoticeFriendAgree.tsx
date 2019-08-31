import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  AgreeWrapper,
  AgreeMain,
  MainText,
} from './style';
import {
  IBaseNotificationUserFriendAgreeParams,
} from 'components/header/Header.types';


export interface IHeaderMainDummyNotificationNoticeFriendAgreeProps {
  // ? 同意加好友的相关信息
  notificationInfo: IBaseNotificationUserFriendAgreeParams;
};


const HeaderMainDummyNotificationNoticeFriendAgree = React.memo((props: IHeaderMainDummyNotificationNoticeFriendAgreeProps) => {
  return (
    <AgreeWrapper>
      <AgreeMain>
        <MainText>
          用户
          <NavLink
            to={`/user/${props.notificationInfo.from._id}`}
          >  {props.notificationInfo.from.username}</NavLink>  同意了你的好友申请, 现在可以开始聊天了!
        </MainText>
      </AgreeMain>
    </AgreeWrapper>
  );
});

export default HeaderMainDummyNotificationNoticeFriendAgree;