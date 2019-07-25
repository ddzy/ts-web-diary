import * as React from 'react';
import { Icon } from 'antd';

import {
  MessageWrapper,
  MessageMain,
} from './style';


export interface IHeaderMainDummyNotificationMessageProps { };


const HeaderMainDummyNotificationMessage = React.memo<IHeaderMainDummyNotificationMessageProps>((
  props: IHeaderMainDummyNotificationMessageProps,
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


export default HeaderMainDummyNotificationMessage;