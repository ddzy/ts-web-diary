import * as React from 'react';
import {
  Icon,
} from 'antd';

import {
  ExtraWrapper,
  ExtraMain,
  ExtraMainText,
  ExtraMainTextLink,
} from './style';


export interface ILoginViewExtraProps { };
export interface ILoginViewExtraState { }


const LoginViewExtra = React.memo((props: ILoginViewExtraProps) => {
  return (
    <ExtraWrapper>
      <ExtraMain>
        <ExtraMainText>
          <ExtraMainTextLink
            href="https://github.com/ddzy"
            target="_blank"
          >
            <Icon type="github" />
            :  https://github.com/ddzy
          </ExtraMainTextLink>
        </ExtraMainText>
      </ExtraMain>
    </ExtraWrapper>
  );
});

export default LoginViewExtra;