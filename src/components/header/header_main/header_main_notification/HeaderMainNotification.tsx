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


export const HeaderMainNotification: React.SFC<IHeaderMainNotificationProps> = (
  props: IHeaderMainNotificationProps,
): JSX.Element => {

  return (
    <MainNotificationWrapper>
      <MainNotificationMainlist>
        <MainNotificationMainListItem>
          <Icon
            type="notification"
            theme="outlined"
          />
        </MainNotificationMainListItem>
        <MainNotificationMainListItem>
          <Icon
            type="message"
            theme="outlined"
          />
        </MainNotificationMainListItem>
      </MainNotificationMainlist>
    </MainNotificationWrapper>
  );
}

export default HeaderMainNotification;