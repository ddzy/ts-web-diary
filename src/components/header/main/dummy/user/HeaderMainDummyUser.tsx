import * as React from 'react';
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


export interface IHeaderMainDummyUserProps extends RouteComponentProps {
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  },
};

const HeaderMainDummyUser = React.memo<IHeaderMainDummyUserProps>((
  props: IHeaderMainDummyUserProps,
): JSX.Element => {
  /**
   * 初始化 - 气泡框内容
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
   * 处理 - 跳转至主页
   */
  function handleToUserPage(): void {
    const userId: string = localStorage.getItem('userid') || '';
    props.history.push(`/user/${userId}/activity`);
  }

  /**
   * 处理 - 退出登录
   */
  function handleLogout(): void {
    Modal.confirm({
      content: '确定要退出登录吗?',
      onOk: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        props.history.push('/login');
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