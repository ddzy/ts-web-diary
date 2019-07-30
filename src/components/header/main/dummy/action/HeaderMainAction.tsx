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
} from 'antd';
import { History } from 'history';

import {
  ActionContainer,
  ActionLogin,
  ActionMeCenter,
  ActionRegister,
  ActionWrite,
  PopoverContent,
  PopoverContentList,
  PopoverItemText,
  PopoverListItem,
} from './style';

export interface IHeaderMainActionProps extends RouteComponentProps<any> {
  history: History;
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  },
};


const HeaderMainAction = React.memo<IHeaderMainActionProps>((
  props: IHeaderMainActionProps,
): JSX.Element => {
  /**
   * 处理初始化气泡框内容
   */
  function handleInitPopoverContent(): JSX.Element {
    return (
      <PopoverContent>
        <PopoverContentList>
          <PopoverListItem>
            <Button
              htmlType="button"
              type="primary"
              icon="setting"
              block={true}
              onClick={handleToMe}
            >
              <PopoverItemText>
                个人中心
              </PopoverItemText>
            </Button>
          </PopoverListItem>
          <PopoverListItem>
            <Button
              htmlType="button"
              type="danger"
              icon="logout"
              block={true}
              onClick={handleLogout}
            >
              <PopoverItemText>
                退出登录
              </PopoverItemText>
            </Button>
          </PopoverListItem>
        </PopoverContentList>
      </PopoverContent>
    );
  }

  /**
   * 处理跳转至write页
   */
  function handleToWrite(): void {
    props.history.push('/publish');
  }

  /**
   * 处理跳转至me页
   */
  function handleToMe(): void {
    const userId: string = localStorage.getItem('userid') || '';
    props.history.push(`/user/${userId}/activity`);
  }

  /**
   * 处理退出登录
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
    <ActionContainer>
      {
        props.authInfo.isAuth
          ? (
            // 头像
            <ActionMeCenter>
              <Popover
                content={handleInitPopoverContent()}
                placement="bottom"
              >
                <Avatar
                  icon="user"
                  shape="square"
                  src={props.authInfo.useravatar}
                />
              </Popover>
            </ActionMeCenter>
          )
          : (
            <React.Fragment>
              <ActionLogin>
                <Link to="/login">登录</Link>
              </ActionLogin>
              <ActionRegister>
                <Link to="/register">注册</Link>
              </ActionRegister>
            </React.Fragment>
          )
      }
      <ActionWrite>
        <Button
          htmlType="button"
          type="primary"
          icon="edit"
          onClick={handleToWrite}
        >写文章</Button>
      </ActionWrite>
    </ActionContainer>
  );
});


export default withRouter(HeaderMainAction);