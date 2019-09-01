import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  withRouter,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Popover,
  Button,
  Avatar,
  Modal,
  Row,
  Col,
} from 'antd';

import {
  UserWrapper,
  UserMain,
  UserMainLogin,
  UserMainMeCenter,
  UserMainRegister,
  UserMainPopoverContent,
  UserMainPopoverContentList,
  UserMainPopoverItemText,
  UserMainPopoverListItem,
} from './style';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


export interface IHeaderMainDummyUserProps extends RouteComponentProps {
  // ? 应用用户token验证信息
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  },
};
export interface IHeaderMainDummyUserState {
  statusIOClient: SocketIOClient.Socket;
};


const HeaderMainDummyUser = React.memo<IHeaderMainDummyUserProps>((
  props: IHeaderMainDummyUserProps,
): JSX.Element => {
  const [state] = React.useState<IHeaderMainDummyUserState>({
    statusIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`),
  });

  React.useEffect(() => {
    return () => {
      state.statusIOClient.close();
    }
  }, []);

  /**
   * [初始化] - 气泡框内容
   */
  function _initPopoverContent(): JSX.Element {
    return (
      <UserMainPopoverContent>
        <UserMainPopoverContentList>
          <UserMainPopoverListItem>
            <Button
              htmlType="button"
              type="primary"
              icon="setting"
              block={true}
              onClick={handleToUserPage}
            >
              <UserMainPopoverItemText>
                个人中心
              </UserMainPopoverItemText>
            </Button>
          </UserMainPopoverListItem>
          <UserMainPopoverListItem>
            <Button
              htmlType="button"
              type="danger"
              icon="logout"
              block={true}
              onClick={handleLogout}
            >
              <UserMainPopoverItemText>
                退出登录
              </UserMainPopoverItemText>
            </Button>
          </UserMainPopoverListItem>
        </UserMainPopoverContentList>
      </UserMainPopoverContent>
    );
  }

  /**
   * [处理] - 跳转至主页
   */
  function handleToUserPage(): void {
    const userId: string = localStorage.getItem('userid') || '';
    props.history.push(`/user/${userId}/activity`);
  }

  /**
   * [处理] - 退出登录
   */
  function handleLogout(): void {
    Modal.confirm({
      content: '确定要退出登录吗?',
      onOk: () => {
        const userId = localStorage.getItem('userid');

        if (userId) {
          // socket处理用户登录(离线)
          state.statusIOClient.emit('sendUserOffLine', {
            userId,
          });
          // socket处理用户正处于哪个会话状态
          state.statusIOClient.emit('sendUserOnWhichChat', {
            userId,
            chatId: '',
          });

          // 清除用户相关信息
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          props.history.push('/login');
        }
      },
    });
  }

  return (
    <UserWrapper>
      <UserMain>
        {
          props.authInfo.isAuth
            ? (
              // 登录状态未过期
              <UserMainMeCenter>
                <Popover
                  content={_initPopoverContent()}
                  placement="bottom"
                >
                  <Avatar
                    icon="user"
                    shape="square"
                    src={props.authInfo.useravatar}
                  />
                </Popover>
              </UserMainMeCenter>
            )
            : (
              // 登录状态已过期
              <React.Fragment>
                <Row>
                  <Col span={12}>
                    <UserMainLogin>
                      <Link to="/login">登录</Link>
                    </UserMainLogin>
                  </Col>
                  <Col span={12}>
                    <UserMainRegister>
                      <Link to="/register">注册</Link>
                    </UserMainRegister>
                  </Col>
                </Row>
              </React.Fragment>
            )
        }
      </UserMain>
    </UserWrapper>
  );
});

export default withRouter(HeaderMainDummyUser);