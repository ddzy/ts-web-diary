import * as React from 'react';
import { Row, Col } from 'antd';

import {
  NotificationWrapper,
  NotificationMain,
} from './style';
import HeaderMainNotificationNotice from './header_main_notification_notice/HeaderMainNotificationNotice';
import HeaderMainNotificationMessage from './header_main_notification_message/HeaderMainNotificationMessage';


export interface IHeaderMainNotificationProps { };


export const HeaderMainNotification = React.memo((
  props: IHeaderMainNotificationProps,
): JSX.Element => {
  return (
    <NotificationWrapper>
      <NotificationMain>
        <Row>
          <Col span={12}>
            <HeaderMainNotificationNotice />
          </Col>
          <Col span={12}>
            <HeaderMainNotificationMessage />
          </Col>
        </Row>
      </NotificationMain>
    </NotificationWrapper>
  );
});

export default HeaderMainNotification;