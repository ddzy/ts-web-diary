import * as React from 'react';
import {
  Button,
} from 'antd';

import {
  LinkWrapper,
  LinkMain,
} from './style';


export interface IPinMainViewEditActionLinkProps { };
export interface IPinMainViewEditActionLinkState { }


const PinMainViewEditActionLink = React.memo((props: IPinMainViewEditActionLinkProps) => {
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

export default PinMainViewEditActionLink;