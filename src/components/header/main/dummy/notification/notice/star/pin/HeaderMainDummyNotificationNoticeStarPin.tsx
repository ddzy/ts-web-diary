import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  PinWrapper,
  PinMain,
} from './style';
import {
  IBaseNotificationUserStarPinParams,
} from 'components/header/Header.types';

export interface IHeaderMainDummyNotificationNoticeStarPinProps {
  // ? 点赞沸点的通知信息
  notificationInfo: IBaseNotificationUserStarPinParams;
};
export interface IHeaderMainDummyNotificationNoticeStarPinState { };


const HeaderMainDummyNotificationNoticeStarPin = React.memo((props: IHeaderMainDummyNotificationNoticeStarPinProps) => {
  return (
    <PinWrapper>
      <PinMain>
        用户
        <NavLink
          to={`/user/${props.notificationInfo.from._id}`}
        >  {props.notificationInfo.from.username}</NavLink>  赞了你的
        <NavLink
          to={`/pin/${props.notificationInfo.pin._id}`}
        >  沸点</NavLink>

      </PinMain>
    </PinWrapper>
  );
});


export default HeaderMainDummyNotificationNoticeStarPin;