import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  AgreeWrapper,
  AgreeMain,
  MainText,
} from './style';


export interface IHeaderMainDummyNotificationNoticeFriendAgreeProps {
  // ? 同意加好友的相关信息
  notificationInfo: {
    from_user_id: string;
    to_user_id: string;
    to_user_name: string;
  };
};


const HeaderMainDummyNotificationNoticeFriendAgree = React.memo((props: IHeaderMainDummyNotificationNoticeFriendAgreeProps) => {
  return (
    <AgreeWrapper>
      <AgreeMain>
        <MainText>
          用户
          <NavLink
            to={`/user/${props.notificationInfo.to_user_id}`}
          >  {props.notificationInfo.to_user_name}</NavLink>  同意了你的好友申请, 现在可以开始聊天了!
        </MainText>
      </AgreeMain>
    </AgreeWrapper>
  );
});

export default HeaderMainDummyNotificationNoticeFriendAgree;