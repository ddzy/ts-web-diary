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
} from 'react-router-dom';
import {
  FormComponentProps,
} from 'antd/lib/form';
import {
  connect,
} from 'react-redux';
import {
  History,
} from 'history';

import bg_img from '../../static/images/bg_img.png';
import {
  RegisterWrapper,
  RegisterContent,
  FormWrapper,
  FormTitle,
  FormFriendLink,
} from './style';
import {
  IStaticOptions,
  serviceHandleRegister,
} from './Register.service';


export interface IRegisterProps extends FormComponentProps {
  history: History;
};
interface IRegisterState {
  serviceState: IStaticOptions;
};



class Login extends React.PureComponent<IRegisterProps, IRegisterState> {

  public readonly state = {
    serviceState: {
      isAuth: false,
      message: '',
    },
  }

  public handleSubmit: React.FormEventHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        serviceHandleRegister(values, (data) => {
          this.setState((prevState) => {
            return {
              ...prevState,
              serviceState: {
                ...prevState.serviceState,
                message: data.message,
                isAuth: data.code === 0,
              },
            };
          }, () => {
            // 提示信息
              message.info(this.state.serviceState.message, () => {
                // 跳转至登录
                this.state.serviceState.isAuth && this.props.history.push('/login');
              });
          });
        });
      }
    });
  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <RegisterWrapper
        bg_url={bg_img}
      >
        <RegisterContent>
          <FormWrapper>
            <Form onSubmit={this.handleSubmit} className="register-form">
              <Form.Item>
                <FormTitle>注册账号</FormTitle>
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('username', {
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
                {getFieldDecorator('userpwd', {
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
                {getFieldDecorator('usergender', {
                  rules: [{ required: true }],
                  initialValue: '♂'
                })(
                  <Radio.Group
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="♂">男</Radio.Button>
                    <Radio.Button value="♀">女</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item style={{ textAlign: 'left' }}>
                <Button
                  type="primary"
                  htmlType="submit" className="login-form-button"
                  style={{ width: '100%' }}
                  size="large"
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
        </RegisterContent>
      </RegisterWrapper>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    RegisterReducer: state.RegisterReducer,
  };
}

export default connect(
  mapStateToProps,
)(Form.create()(Login)) as React.ComponentClass<any>;