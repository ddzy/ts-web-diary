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


const HeaderMainNav: React.SFC<IHeaderMainNavProps> = (
  props: IHeaderMainNavProps,
): JSX.Element => {

  const [
    state,
    setState,
  ] = React.useState<IHeaderMainNavState>({
    navList: [
      { path: '/home', value: '首页', children: null },
      { path: '/article', value: '文章', children: null },
    ],
  });

  React.useEffect(handleDealNavList);

  /**
   * 处理动态添加导航路由
   */
  function handleDealNavList(): void {
    const { pathname } = props.location;

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

    setState((prevState) => {
      return {
        navList: prevState.navList.concat(result),
      };
    });

    // 默认选中菜单栏
    const oUl = document.getElementById('header-navbar');
    const oLi = oUl && oUl.querySelectorAll('li');

    oLi && Array.from(oLi).forEach((item) => {
      // item.getAttribute('data-pane') === pathname
      pathname.includes(item.getAttribute('data-pane') || '')
        && item.classList.add('header-active');
    });
  }

  function handleInitNavList (): JSX.Element[] {
    return state.navList.map((item: any) => {
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

  return (
    <MainNavContainer>
      <MainNavList id="header-navbar">
        {handleInitNavList()}
      </MainNavList>
    </MainNavContainer>
  );
}


export default withRouter(HeaderMainNav);