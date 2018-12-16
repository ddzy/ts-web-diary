import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Modal,
  Affix,
} from 'antd';

import headerNavConfig from '../../config/headerNav.config';
import {
  HeaderWrapper,
  MainNavItem,
  PopoverContent,
  PopoverContentList,
  PopoverListItem,
  PopoverItemText,
} from './style';
import HeaderMain from './header_main/HeaderMain';


export interface IHeaderProps extends RouteComponentProps<any> {
  AuthRouteReducer: {
    isAuth: boolean;
    username: string;
    useravatar: string;
  };
};
interface IHeaderState {
  navList: object[];
};


class Header extends React.Component<IHeaderProps, IHeaderState> {

  public readonly state = {
    navList: [
      { path: '/home', value: '首页', children: null },
      { path: '/article', value: '文章', children: null },
    ],
  }

  public componentDidMount(): void {
    this.handleDealNavList();
  }

  public handleDealNavList = (): void => {
    const { pathname } = this.props.location;

    const result = headerNavConfig.filter((item: any) => {
      return item.path === pathname;
    });

    /\/details\/\w*/.test(pathname)
      && result.push({
        path: '/details', value: '详情', children: null
      });

    /\/collection\/\w*/.test(pathname)
      && result.push({
        path: '/collection',
        value: '收藏',
        children: null,
      });

    this.setState((prevState) => {
      return {
        navList: prevState.navList.concat(result),
      };
    }, () => {
      // 默认选中菜单栏
      const oUl = document.getElementById('header-navbar');
      const oLi = oUl && oUl.querySelectorAll('li');

      oLi && Array.from(oLi).forEach((item) => {
        // item.getAttribute('data-pane') === pathname
        pathname.includes(item.getAttribute('data-pane') || '')
          && item.classList.add('header-active');
      });
    });
  }

  /**
   * 初始化菜单栏
   */
  public initHeaderNavList = (): JSX.Element[] => {
    return this.state.navList.map((item) => {
      return (
        <MainNavItem
          key={item.path}
          data-pane={item.path}
        >
          <Link to={item.path}>{item.value}</Link>
        </MainNavItem>
      );
    });
  }

  /**
   * 退出登录
   */
  public handleLogout: React.MouseEventHandler = (): void => {
    Modal.confirm({
      content: '确定要退出登录吗?',
      onOk: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        this.props.history.push('/login');
      },
    });
  }

  /**
   * 个人中心
   */
  public handleToMe: React.MouseEventHandler = (): void => {
    this.props.history.push('/me');
  }

  /**
   * 写文章
   */
  public handleToWrite: React.MouseEventHandler = () => {
    this.props.history.push('/publish');
  }

  public initPopoverContent = (): JSX.Element => {
    return (
      <PopoverContent>
        <PopoverContentList>
          <PopoverListItem>
            <Button
              htmlType="button"
              type="primary"
              icon="setting"
              block={true}
              onClick={this.handleToMe}
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
              onClick={this.handleLogout}
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

  public render(): JSX.Element {
    return (
      <Affix
        offsetTop={1}
      >
        <HeaderWrapper>
          <HeaderMain
            authInfo={{...this.props.AuthRouteReducer}}
          />
        </HeaderWrapper>
      </Affix>
    );
  }
}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default withRouter(connect(
  mapStateToProps,
)(Header)) as React.ComponentClass<any>;