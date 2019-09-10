import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  Link,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import {
  Row,
  Col,
  Icon,
  message,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import {
  BIND_THIRD_PARTY_INFO,
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';
import { query } from 'services/request';


export interface ILoginViewActionProps extends RouteComponentProps { };
export interface ILoginViewActionState {
  // ? 状态相关的Websocket
  statusIOClient: SocketIOClient.Socket;
}


const LoginViewAction = React.memo((props: ILoginViewActionProps) => {

  const [state] = React.useState<ILoginViewActionState>({
    statusIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`),
  });

  React.useEffect(() => {
    return () => {
      // 关闭socket链接
      state.statusIOClient.close();
    }
  }, []);

  React.useEffect(() => {
    handleSendGithubCode();
  }, [props.location.search]);


  /**
   * [处理] - 第三方登录: github
   */
  function handleLoginByGithub() {
    const {
      client_id,
      get_code_uri,
      redirect_uri,
    } = BIND_THIRD_PARTY_INFO.github;

    const oLink = document.createElement('a');

    // oLink.href = 'https://github.com/login/oauth/authorize?client_id=fce9ff3b1d6b896c1349&redirect_uri=http://localhost:3000/login';

    oLink.href = `${get_code_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;

    oLink.click();
    oLink.remove();
  }

  /**
   * [处理] - 将github返回的code凭证发送至后台
   */
  function handleSendGithubCode() {
    const sParam = props.location.search;

    if (sParam) {
      // 提取code
      const githubCode = sParam.replace(/\?code=/, '');

      query({
        method: 'POST',
        url: '/api/auth/github',
        jsonp: false,
        data: {
          code: githubCode,
        },
      }).then((res) => {
        const resCode = res.code;
        const resMessage = res.message;
        const resData = res.data;

        if (resCode === 0) {
          const { userInfo } = resData;

          message.success(resMessage);

          localStorage.setItem('userid', userInfo._id);
          localStorage.setItem('token', userInfo.token);

          state.statusIOClient.emit('sendUserOnLine', {
            userId: userInfo._id,
          });

          props.history.push('/home');
        } else if (resCode === -1) {
          message.info(resMessage);
        }
      });
    }
  }

  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={12}>
            没有账号?
            <Link to="/register">注册</Link>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>第三方登录: </Col>
              <Col span={4}>
                <Icon
                  type="github"
                  style={{
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                  title="Github"
                  onClick={handleLoginByGithub}
                />
              </Col>
              <Col span={4}>
                <Icon
                  type="qq"
                  style={{
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                  title="QQ"
                />
              </Col>
              <Col span={4}>
                <Icon
                  type="weibo"
                  style={{
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                  title="微博"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default withRouter(LoginViewAction);