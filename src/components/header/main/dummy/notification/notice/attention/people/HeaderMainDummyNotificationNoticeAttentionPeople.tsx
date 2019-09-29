import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  PeopleWrapper,
  PeopleMain,
} from './style';
import {
  IBaseNotificationUserAttentionPeopleParams,
} from 'components/header/Header.types';


export interface IHeaderMainDummyNotificationNoticeAttentionPeopleProps {
  // ? 关注我的通知信息
  notificationInfo: IBaseNotificationUserAttentionPeopleParams;
};
export interface IHeaderMainDummyNotificationNoticeAttentionPeopleState { };


const HeaderMainDummyNotificationNoticeAttentionPeople = React.memo((props: IHeaderMainDummyNotificationNoticeAttentionPeopleProps) => {
  return (
    <PeopleWrapper>
      <PeopleMain>
        用户
        <NavLink
          to={`/user/${props.notificationInfo.from._id}`}
        >  {props.notificationInfo.from.username}</NavLink>  关注了你
      </PeopleMain>
    </PeopleWrapper>
  );
});


export default HeaderMainDummyNotificationNoticeAttentionPeople;