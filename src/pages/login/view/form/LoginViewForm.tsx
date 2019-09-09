import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Form,
  Input,
  Icon,
  Button,
  message,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  FormWrapper,
  FormMain,
} from './style';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';
import { query } from 'services/request';


export interface ILoginViewFormProps extends FormComponentProps, RouteComponentProps { };
export interface ILoginViewFormState {
  // ? 状态相关的Websocket
  statusIOClient: SocketIOClient.Socket;

  // ? 用户信息
  userInfo: {
    username: string,
    userpwd: string,
  };
  // ? 登录按钮是否处于loading状态
  isLoginButtonLoading: boolean;
}


const LoginViewForm = React.memo((props: ILoginViewFormProps) => {

  const [state, setState] = React.useState<ILoginViewFormState>({
    userInfo: {
      username: '',
      userpwd: '',
    },
    statusIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`),
    isLoginButtonLoading: false,
  });

  React.useEffect(() => {
    // ? 从注册页直接过来, 自动填充账号密码
    const location = props.location as any;

    if (location.state) {
      const userInfo = location.state;

      setState({
        ...state,
        userInfo,
      });
    }

    return () => {
      state.statusIOClient.close();
    };
  }, []);

  /**
   * [处理] - 登录
   * @param e 表单DOM
   */
  function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        setState({
          ...state,
          isLoginButtonLoading: true,
        });

        query({
          url: '/api/login',
          method: 'POST',
          data: values,
          jsonp: false,
        }).then((res) => {
          const code = res.code;
          const tipMessage = res.message;

          if (code === 1) {
            message.error(tipMessage);
          } else if (code === 0) {
            const { userInfo } = res.data;

            message.success(tipMessage);

            localStorage.setItem('userid', userInfo._id);
            localStorage.setItem('token', userInfo.token);

            // ** socket处理用户在线状态(在线) **
            state.statusIOClient.emit('sendUserOnLine', {
              userId: userInfo._id,
            });

            props.history.push('/home');
          } else if (code === -1) {
            message.info(tipMessage);
          }

          setState({
            ...state,
            isLoginButtonLoading: false,
          });
        });
      }
    });
  }

  return (
    <FormWrapper>
      <FormMain>
        <Form
          onSubmit={handleSubmit}
          className="login-form"
        >
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
          </Form.Item>
        </Form>
      </FormMain>
    </FormWrapper>
  );
});

export default withRouter(Form.create()(LoginViewForm) as any);