import * as React from 'react';

import {
  TitleWrapper,
  TitleMain,
  TitleMainText,
} from './style';


export interface ILoginViewTitleProps { };
export interface ILoginViewTitleState { }


const LoginViewTitle = React.memo((props: ILoginViewTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <TitleMainText>
          请登录
        </TitleMainText>
      </TitleMain>
    </TitleWrapper>
  );
});

export default LoginViewTitle;