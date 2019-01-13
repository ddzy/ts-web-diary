import * as React from 'react';
import {
  Link,
} from 'react-router-dom';

import {
  GlobalStyleSet,
  MainNavContainer,
  MainNavItem,
  MainNavList,
} from './style';
import headerNavConfig from 'config/headerNav.config';


export interface IHeaderMainNavProps {
  location: any;
};
interface IHeaderMainNavState {};


class HeaderMainNav extends React.PureComponent<IHeaderMainNavProps, IHeaderMainNavState> {

  public static getDerivedStateFromProps = (
    nextProps: IHeaderMainNavProps
  ) => {
    HeaderMainNav._setNavItemStyle(nextProps.location.pathname);

    return null;
  }

  /**
   * 处理默认选中navItem项
   */
  public static _setNavItemStyle = (
    pathname: string,
  ): void => {
    const oUl = document.getElementById('header-navbar');
    const oLi = oUl && oUl.querySelectorAll('li');

    oLi && Array.from(oLi).forEach((item) => {
      pathname.includes(item.getAttribute('data-pane') || '')
        ? item.classList.add('header-active')
        : item.classList.remove('header-active');
    });

  }

  public readonly state: IHeaderMainNavState = {}

  /**
   * 处理初始化菜单栏
   */
  public handleInitHeaderNavList = (): JSX.Element[] => {
    return headerNavConfig.map((item) => (
      <MainNavItem
        key={item.path}
        data-pane={item.path}
      >
        <Link to={item.path}>{item.name}</Link>
      </MainNavItem>

    ));
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


export default HeaderMainNav;