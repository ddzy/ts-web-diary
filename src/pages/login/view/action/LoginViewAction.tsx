import * as React from 'react';
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
  ActionMainToGithubLink,
} from './style';
import {
  BIND_THIRD_PARTY_INFO,
  CLIENT_WEBSITE_INFO,
} from 'constants/constants';
import { query } from 'services/request';
import { statusIOClient } from 'services/websocket';


export interface ILoginViewActionProps extends RouteComponentProps { };
export interface ILoginViewActionState {
  // ? 状态相关的Websocket
  statusIOClient: SocketIOClient.Socket;
}


const LoginViewAction = React.memo((props: ILoginViewActionProps) => {

  const {
    schema,
    domain,
    port,
  } = CLIENT_WEBSITE_INFO;
  const {
    client_id,
    get_code_uri,
  } = BIND_THIRD_PARTY_INFO.github;
  const redirect_uri = `${schema}://${domain}:${port}/login`;

  const [state] = React.useState<ILoginViewActionState>({
    statusIOClient,
  });

  React.useEffect(() => {
    handleSendGithubCode();
  }, [props.location.search]);


  /**
   * [处理] - 将github返回的code凭证发送至后台
   */
  function handleSendGithubCode() {
    const sParam = props.location.search;

    if (sParam) {
      message.loading('正在通过github登录, 请耐心等待...', 1);

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
                <ActionMainToGithubLink
                  href={`${get_code_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`}
                >
                  <Icon
                    type="github"
                    style={{
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                    title="Github"
                  />
                </ActionMainToGithubLink>
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