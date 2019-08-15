import * as React from 'react';
// import * as IO from 'socket.io-client';
// import * as SocketIOClient from 'socket.io-client';
import * as IO from 'socket.io-client';
import {
  Form,
  Icon,
  Input,
  Button,
  message,
  Divider,
} from 'antd';
import { Link, match } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { History } from 'history';
import { hot } from 'react-hot-loader';

import bg_img from '../../static/images/bg_img.png';
import { query } from 'services/request';
import {
  LoginWrapper,
  LoginContent,
  FormWrapper,
  FormTitle,
  FormFriendLink,
} from './style';


export interface ILoginProps extends FormComponentProps {
  history: History;
  location: Location;
  match: match<any>;
};
export interface ILoginState {
  serviceState: {
    userid: string;
    username: string;
    message: string;
  };
  statusIO: SocketIOClient.Socket,
};


class Login extends React.PureComponent<ILoginProps, ILoginState> {

  public readonly state: ILoginState = {
    serviceState: {
      userid: '',
      username: '',
      message: '',
    },
    statusIO: IO('ws://localhost:8888/status'),
  }

  public componentWillUnmount() {
    this.state.statusIO.close();
  }

  /**
   * [处理] - 登录
   */
  public handleSubmit: React.FormEventHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        query({
          url: '/api/login',
          method: 'POST',
          data: values,
          jsonp: false
        })
          .then((data) => {
            if (data.code === 0) {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  serviceState: {
                    ...prevState.serviceState,
                    ...data,
                  },
                };
              }, () => {
                // ** 存储token **
                localStorage.setItem('token', data.token);
                localStorage.setItem('userid', data.userid);

                // ** socket处理用户在线状态 **
                this.state.statusIO.emit('sendUserOnLine', {
                  userId: data.userid,
                });

                // ** 页面跳转,提示信息 **
                this.props.history.push('/home/frontend');
                message.info(
                  <React.Fragment>
                    点击右侧查看
                    <span style={{ color: '#1890ff' }}>
                      --在线人数
                    </span>
                  </React.Fragment>
                );
              });
            } else {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  serviceState: {
                    ...prevState.serviceState,
                    ...data,
                  },
                };
              }, () => {
                message.error(this.state.serviceState.message);
              });
            }
          })
      }
    });
  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <LoginWrapper
        bg_url={bg_img}
      >
        <LoginContent>
          <FormWrapper>
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
            >
              <Form.Item>
                <FormTitle>请登录</FormTitle>
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your Pickname!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" />} placeholder="Username"
                      size="large"
                    />
                  )
                }
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('userpwd', {
                  rules: [{ required: true }, { message: '请输入密码!' }]
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
          </FormWrapper>
        </LoginContent>
      </LoginWrapper>
    );
  }
}


export default hot(module)(Form.create()(Login));