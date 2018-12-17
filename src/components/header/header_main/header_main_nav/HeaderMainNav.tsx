import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
  Link,
} from 'react-router-dom';
import {
  Location,
} from 'history';

import {
  GlobalStyleSet,
  MainNavContainer,
  MainNavItem,
  MainNavList,
} from './style';
import headerNavConfig from '../../../../config/headerNav.config';


export interface IHeaderMainNavProps extends RouteComponentProps<IHeaderMainNavProps> {
  location: Location;
};
interface IHeaderMainNavState {
  navList: Array<{
    path: string,
    value: string,
    children: any,
  }>;
};


class HeaderMainNav extends React.PureComponent<IHeaderMainNavProps, IHeaderMainNavState> {

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

    const result: any = headerNavConfig.filter((item: any) => {
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
   * 处理初始化菜单栏
   */
  public handleInitHeaderNavList = (): JSX.Element[] => {
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

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MainNavContainer>
          <MainNavList id="header-navbar">
            {this.handleInitHeaderNavList()}
          </MainNavList>
        </MainNavContainer>

        {/* Global Style Set */}
        <GlobalStyleSet />
      </React.Fragment>
    );
  }
}


export default withRouter(HeaderMainNav);