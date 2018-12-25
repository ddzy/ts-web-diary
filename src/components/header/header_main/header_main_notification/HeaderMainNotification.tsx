import * as React from 'react';
import {
  Icon,
} from 'antd';

import {
  MainNotificationWrapper,
  MainNotificationMainlist,
  MainNotificationMainListItem,
} from './style';


export interface IHeaderMainNotificationProps { };


export const HeaderMainNotification = React.memo((
  props: IHeaderMainNotificationProps,
): JSX.Element => {
  return (
    <MainNotificationWrapper>
      <MainNotificationMainlist>
        <MainNotificationMainListItem>
          <Icon
            type="notification"
            theme="filled"
          />
        </MainNotificationMainListItem>
        <MainNotificationMainListItem>
          <Icon
            type="message"
            theme="filled"
          />
        </MainNotificationMainListItem>
      </MainNotificationMainlist>
    </MainNotificationWrapper>
  );
});

export default HeaderMainNotification;