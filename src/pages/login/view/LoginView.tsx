import * as React from 'react';

import {
  ViewWrapper,
  ViewMain,
} from './style';
import LoginViewTitle from './title/LoginViewTitle';
import LoginViewForm from './form/LoginViewForm';
import LoginViewAction from './action/LoginViewAction';
import LoginViewExtra from './extra/LoginViewExtra';


export interface ILoginViewProps { };
export interface ILoginViewState { }


const LoginView = React.memo((props: ILoginViewProps) => {
  return (
    <ViewWrapper>
      <ViewMain>
        {/* 标题区块 */}
        <LoginViewTitle />

        {/* 登录表单区块 */}
        <LoginViewForm />

        {/* 第三方登录区块 */}
        <LoginViewAction />

        {/* 附加信息区块 */}
        <LoginViewExtra />
      </ViewMain>
    </ViewWrapper>
  );
});

export default LoginView;