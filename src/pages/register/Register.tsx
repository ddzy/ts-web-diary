import * as React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Radio,
  message,
} from 'antd';
import {
  Link,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';

import bg_img from '../../static/images/bg_img.png';
import {
  RegisterWrapper,
  RegisterMain,
  FormWrapper,
  FormTitle,
  FormFriendLink,
} from './style';
import { query } from 'services/request';


export interface IRegisterProps extends FormComponentProps, RouteComponentProps {
};
export interface IRegisterState {
  // ? 标识注册按钮是否处于loading状态
  isSubmitButtonLoading: boolean;
};


const Register = React.memo((props: IRegisterProps) => {
  const [state, setState] = React.useState<IRegisterState>({
    isSubmitButtonLoading: false,
  });

  function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        setState({
          ...state,
          isSubmitButtonLoading: true,
        });

        query({
          jsonp: false,
          method: 'POST',
          url: '/api/register',
          data: {
            ...values,
          },
        }).then((res) => {
          const code = res.code;
          const tipMessage = res.message;
          const data = res.data;

          if (code === 0) {
            message.success(tipMessage);

            props.history.push('/login', {
              username: data.username,
              userpwd: data.userpwd,
            });
          } else {
            message.error(tipMessage);
          }

          setState({
            ...state,
            isSubmitButtonLoading: false,
          });
        });
      }
    });
  }

  return (
    <RegisterWrapper
      bg_url={bg_img}
    >
      <RegisterMain>
        <FormWrapper>
          <Form onSubmit={handleSubmit} className="register-form">
            <Form.Item>
              <FormTitle>注册账号</FormTitle>
            </Form.Item>
            <Form.Item>
              {
                props.form.getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    placeholder="输入您的昵称..."
                    size="large"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                props.form.getFieldDecorator('userpwd', {
                  rules: [{ required: true, message: '请输入密码!' }]
                })(
                  <Input
                    placeholder="输入您的密码..."
                    size="large"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                props.form.getFieldDecorator('usergender', {
                  rules: [{ required: true }],
                  initialValue: 'male'
                })(
                  <Radio.Group
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="male">男</Radio.Button>
                    <Radio.Button value="female">女</Radio.Button>
                  </Radio.Group>
                )}
            </Form.Item>
            <Form.Item style={{ textAlign: 'left' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{
                  width: '100%',
                }}
                size="large"
                loading={state.isSubmitButtonLoading}
              >Register</Button>
              已有账号? <Link to="/login" replace={true}>登录</Link>
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
      </RegisterMain>
    </RegisterWrapper>
  );
});


export default withRouter(Form.create()(Register) as any);