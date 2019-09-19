import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  LinkWrapper,
  LinkMain,
} from './style';


export interface IBasePinEditActionLinkProps { };
export interface IBasePinEditActionLinkState { }


const BasePinEditActionLink = React.memo((props: IBasePinEditActionLinkProps) => {
  return (
    <LinkWrapper>
      <LinkMain>
        <Button
          type="link"
          icon="link"
        >链接</Button>
      </LinkMain>
    </LinkWrapper>
  );
});

export default BasePinEditActionLink;