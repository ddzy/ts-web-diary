import * as React from 'react';
// import * as IOClient from 'socket.io-client';
import {
  // Form,
  // Icon,
  // Input,
  // Button,
  // message,
  // Divider,
} from 'antd';
import {
  // Link,
  RouteComponentProps,
} from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

import bg_img from '../../static/images/bg_img.png';
// import { query } from 'services/request';
import {
  LoginWrapper,
  LoginMain,
  // FormWrapper,
  // FormTitle,
  // FormFriendLink,
} from './style';
// import {
//   SOCKET_CONNECTION_INFO,
// } from 'constants/constants';
import LoginView from './view/LoginView';


export interface ILoginProps extends FormComponentProps, RouteComponentProps {
};
export interface ILoginState {
  // ? 状态相关的Websocket
  statusIOClient: SocketIOClient.Socket;

  // ? 用户信息
  userInfo: {
    username: string,
    userpwd: string,
  };
  // ? 登录按钮是否处于loading状态
  isLoginButtonLoading: boolean;
};



const Login = React.memo((props: ILoginProps) => {
  // const [state, setState] = React.useState<ILoginState>({
  //   userInfo: {
  //     username: '',
  //     userpwd: '',
  //   },
  //   statusIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`),
  //   isLoginButtonLoading: false,
  // });

  // React.useEffect(() => {
  //   // ? 从注册页直接过来, 自动填充账号密码
  //   const location = props.location as any;

  //   if (location.state) {
  //     const userInfo = location.state;

  //     setState({
  //       ...state,
  //       userInfo,
  //     });
  //   }

  //   return () => {
  //     state.statusIOClient.close();
  //   };
  // }, []);

  // /**
  //  * [处理] - 登录
  //  * @param e 表单DOM
  //  */
  // function handleSubmit(
  //   e: React.FormEvent,
  // ) {
  //   e.preventDefault();

  //   props.form.validateFields((err, values) => {
  //     if (!err) {
  //       setState({
  //         ...state,
  //         isLoginButtonLoading: true,
  //       });

  //       query({
  //         url: '/api/login',
  //         method: 'POST',
  //         data: values,
  //         jsonp: false,
  //       }).then((res) => {
  //         const code = res.code;
  //         const tipMessage = res.message;

  //         if (code === 1) {
  //           message.error(tipMessage);
  //         } else if (code === 0) {
  //           const { userInfo } = res.data;

  //           message.success(tipMessage);

  //           localStorage.setItem('userid', userInfo._id);
  //           localStorage.setItem('token', userInfo.token);

  //           // ** socket处理用户在线状态(在线) **
  //           state.statusIOClient.emit('sendUserOnLine', {
  //             userId: userInfo._id,
  //           });

  //           props.history.push('/home');
  //         } else if (code === -1) {
  //           message.info(tipMessage);
  //         }

  //         setState({
  //           ...state,
  //           isLoginButtonLoading: false,
  //         });
  //       });
  //     }
  //   });
  // }

  return (
    <LoginWrapper
      bg_url={bg_img}
    >
      <LoginMain>
        <LoginView />
        {/* <FormWrapper>
          <Form
            onSubmit={handleSubmit}
            className="login-form"
          >
            <Form.Item>
              <FormTitle>请登录</FormTitle>
            </Form.Item>
            <Form.Item>
              {
                props.form.getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your Pickname!' }],
                  initialValue: state.userInfo.username,
                })(
                  <Input
                    prefix={<Icon type="user" />} placeholder="Username"
                    size="large"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator('userpwd', {
                rules: [{ required: true }, { message: '请输入密码!' }],
                initialValue: state.userInfo.userpwd,
              })(
                <Input
                  prefix={<Icon type="lock" />} type="password" placeholder="Userpwd"
                  size="large"
                />
              )
              }
            </Form.Item>
            <Form.Item style={{ textAlign: 'left' }}>
              <Button
                type="primary"
                htmlType="submit" className="login-form-button"
                style={{ width: '100%' }}
                size="large"
                loading={state.isLoginButtonLoading}
              >login</Button>
              没有账号?   <Link to="/register" replace>去注册</Link>
              <Divider type="vertical" />
              <Link to="/home" replace>去首页逛逛</Link>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <FormFriendLink>
                <span>
                  <Icon type="github" /><a href="https://github.com/ddzy" target="blank">         https://github.com/ddzy</a>
                </span>
              </FormFriendLink>
            </Form.Item>
          </Form>
        </FormWrapper> */}
      </LoginMain>
    </LoginWrapper>
  );
});


// export default (Form.create()(Login));
export default Login;