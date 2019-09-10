import * as React from 'react';
import {
  RouteComponentProps,
} from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

import bg_img from '../../static/images/bg_img.png';
import {
  LoginWrapper,
  LoginMain,
} from './style';
import LoginView from './view/LoginView';


export interface ILoginProps extends FormComponentProps, RouteComponentProps {
};
export interface ILoginState {
};


const Login = React.memo((props: ILoginProps) => {
  return (
    <LoginWrapper
      bg_url={bg_img}
    >
      <LoginMain>
        <LoginView />
      </LoginMain>
    </LoginWrapper>
  );
});


// export default (Form.create()(Login));
export default Login;