import * as React from 'react';
import { Icon } from 'antd';

import {
  NoticeWrapper,
  NoticeMain,
} from './style';


export interface IHeaderMainDummyNotificationNoticeProps { };


const HeaderMainDummyNotificationNotice = React.memo<IHeaderMainDummyNotificationNoticeProps>((
  props: IHeaderMainDummyNotificationNoticeProps,
): JSX.Element => {

  return (
    <NoticeWrapper>
      <NoticeMain>
        <Icon
          type="notification"
          theme="filled"
        />
      </NoticeMain>
    </NoticeWrapper>
  );

});


export default HeaderMainDummyNotificationNotice;