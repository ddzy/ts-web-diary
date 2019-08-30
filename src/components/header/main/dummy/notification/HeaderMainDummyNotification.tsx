import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  NotificationWrapper,
  NotificationMain,
} from './style';
import HeaderMainDummyNotificationNotice from './notice/HeaderMainDummyNotificationNotice';
import HeaderMainDummyNotificationMessage from './message/HeaderMainDummyNotificationMessage';


export interface IHeaderMainDummyNotificationProps { };


export const HeaderMainDummyNotification = React.memo((
  props: IHeaderMainDummyNotificationProps,
): JSX.Element => {
  return (
    <NotificationWrapper>
      <NotificationMain>
        <Row>
          <Col span={12}>
            {/* 应用通知(用户 + 管理员) */}
            <HeaderMainDummyNotificationNotice />
          </Col>
          <Col span={12}>
            {/* 消息通知(聊天) */}
            <HeaderMainDummyNotificationMessage />
          </Col>
        </Row>
      </NotificationMain>
    </NotificationWrapper>
  );
});

export default HeaderMainDummyNotification;