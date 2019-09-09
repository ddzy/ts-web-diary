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
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import {
  BIND_THIRD_PARTY_INFO,
} from 'constants/constants';
import { query } from 'services/request';


export interface ILoginViewActionProps extends RouteComponentProps { };
export interface ILoginViewActionState { }


const LoginViewAction = React.memo((props: ILoginViewActionProps) => {

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
      const code = sParam.replace(/\?code=/, '');

      query({
        method: 'POST',
        url: '/api/auth/github',
        jsonp: false,
        data: {
          code,
        },
      }).then((res) => {
        console.log(res);
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