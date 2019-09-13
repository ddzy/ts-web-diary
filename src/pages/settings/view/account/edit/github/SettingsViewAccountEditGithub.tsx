import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Row,
  Col,
  Icon,
  Button,
  Modal,
  notification,
  message,
} from 'antd';

import {
  GithubWrapper,
  GithubMain,
  GithubMainItemTitleText,
  GithubMainItemContentText,
} from './style';
import {
  ISettingsViewAccountEditState,
} from '../SettingsViewAccountEdit';
import {
  BIND_THIRD_PARTY_INFO,
} from 'constants/constants';
import { query } from 'services/request';


export interface ISettingsViewAccountEditGithubProps extends RouteComponentProps {
  // ? 关联的github相关信息
  accountGithubInfo: ISettingsViewAccountEditState['accountInfo']['github'];
};
export interface ISettingsViewAccountEditGithubState {
  // ? 是否已经绑定Github
  isBindGithub: boolean;
  // ? 绑定按钮的loading状态
  isBindBtnLoading: boolean;
}


const SettingsViewAccountEditGithub = React.memo((props: ISettingsViewAccountEditGithubProps) => {
  const {
    client_id,
    get_code_uri,
    redirect_uri,
  } = BIND_THIRD_PARTY_INFO.github;


  const [state, setState] = React.useState<ISettingsViewAccountEditGithubState>({
    isBindGithub: false,
    isBindBtnLoading: false,
  });

  React.useEffect(() => {
    setState({
      ...state,
      isBindGithub: props.accountGithubInfo.is_bind_github,
    });
  }, [props.accountGithubInfo]);

  React.useEffect(() => {
    handleAccountGithub();
  }, [props.location.search]);


  /**
   * [初始化] - 绑定按钮
   * @description 根据是否关联了github, 来初始化对应的内容和功能
   */
  function _initBindButtonContent(): JSX.Element {
    const { isBindGithub } = state;

    return isBindGithub
      ? (
        <Button
          type="link"
          loading={state.isBindBtnLoading}
          onClick={handleDisaccountGithub}
        >解除绑定</Button>
      )
      : (
        <a
          href={`${get_code_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`}
        >
          <Button
            type="link"
            icon="link"
            loading={state.isBindBtnLoading}
          >绑定</Button>
        </a>
      );
  }

  /**
   * [处理] - 解除github绑定
   */
  function handleDisaccountGithub() {
    setState({
      ...state,
      isBindBtnLoading: true,
    });

    Modal.confirm({
      title: '要解除当前关联的Github吗?',
      content: '请注意, 如果您是通过 Github 登录, 并且没有绑定其它第三方账号, 您的账户数据可能会丢失. 如果您有账号密码, 可以忽略该警告',
      onOk() {
        const userId = localStorage.getItem('userid');

        if (!userId) {
          notification.error({
            message: '错误',
            description: '用户信息已丢失, 请重新登录!',
          });

          return props.history.push('/login');
        }

        const githubId = props.accountGithubInfo.bind_github_id;

        query({
          method: 'POST',
          jsonp: false,
          url: '/api/auth/github/disaccount',
          data: {
            userId,
            githubId,
          },
        }).then((res) => {
          const resCode = res.code;
          const resMessage = res.message;

          if (resCode === 0) {
            setState({
              ...state,
              isBindGithub: false,
              isBindBtnLoading: false,
            });

            message.success(resMessage);
          } else if (resCode === -1) {
            message.error(resMessage);
          } else {
            message.info(resMessage);
          }
        });
      },
      onCancel() {
        setState({
          ...state,
          isBindBtnLoading: false,
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  }

  /**
   * [处理] - 关联github
   */
  function handleAccountGithub() {
    const sParam = props.location.search;

    if (sParam) {
      // 提取code
      const githubCode = sParam.replace(/\?code=/, '');

      console.log(githubCode);
    }
  }


  return (
    <GithubWrapper>
      <GithubMain>
        <Row>
          <Col span={5}>
            <Icon
              theme="filled"
              type="github"
              style={{
                fontSize: 18,
              }}
            />
            <GithubMainItemTitleText>Github</GithubMainItemTitleText>
          </Col>
          <Col span={15}>
            <GithubMainItemContentText>
              {
                state.isBindGithub
                  ? props.accountGithubInfo.bind_github_user_info
                      ?     props.accountGithubInfo.bind_github_user_info.login
                    : ''
                  : ''
              }
            </GithubMainItemContentText>
          </Col>
          <Col span={4}>
            {_initBindButtonContent()}
          </Col>
        </Row>
      </GithubMain>
    </GithubWrapper>
  );
});

export default withRouter(SettingsViewAccountEditGithub);