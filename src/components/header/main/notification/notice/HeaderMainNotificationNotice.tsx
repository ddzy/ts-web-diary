import * as React from 'react';
import { Icon } from 'antd';

import {
  NoticeWrapper,
  NoticeMain,
} from './style';


export interface IHeaderMainNotificationNoticeProps { };


const HeaderMainNotificationNotice = React.memo<IHeaderMainNotificationNoticeProps>((
  props: IHeaderMainNotificationNoticeProps,
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


export default HeaderMainNotificationNotice;