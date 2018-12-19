import * as React from 'react';
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

import bg_img from '../../static/images/bg_img.png';
import {
  LoginWrapper,
  LoginContent,
  FormWrapper,
  FormTitle,
  FormFriendLink,
} from './style';
import {
  IStaticOptions,
  serviceHandleLogin,
} from './Login.service';


export interface ILoginProps extends FormComponentProps {
  history: History;
  location: Location;
  match: match<any>;
};
interface ILoginState {
  serviceState: IStaticOptions;
};


class Login extends React.PureComponent<ILoginProps, ILoginState> {

  public readonly state = {
    serviceState: {
      userid: '',
      username: '',
      message: '',
    },
  }

  public handleSubmit: React.FormEventHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        serviceHandleLogin(values, (data) => {
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

              // ** 页面跳转,提示信息 **
              this.props.history.push('/home');
              message.info(
                <React.Fragment>
                  欢迎进入
                  <span style={{ color: '#1890ff' }}>
                    --Gayhub
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
        });
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


export default Form.create()(Login);