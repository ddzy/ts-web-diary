import * as React from 'react';
import { Icon } from 'antd';

import {
  MessageWrapper,
  MessageMain,
} from './style';


export interface IHeaderMainNotificationMessageProps { };


const HeaderMainNotificationMessage = React.memo<IHeaderMainNotificationMessageProps>((
  props: IHeaderMainNotificationMessageProps,
): JSX.Element => {

  return (
    <MessageWrapper>
      <MessageMain>
        <Icon
          type="message"
          theme="filled"
        />
      </MessageMain>
    </MessageWrapper>
  );

});


export default HeaderMainNotificationMessage;