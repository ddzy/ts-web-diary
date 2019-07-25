import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  GlobalStyleSet,
  MainNavContainer,
  MainNavItem,
  MainNavList,
} from './style';
import headerNavConfig from 'config/headerNav.config';


export interface IHeaderMainNavProps {};
interface IHeaderMainNavState {};


class HeaderMainNav extends React.PureComponent<IHeaderMainNavProps, IHeaderMainNavState> {

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
        <NavLink
          to={item.path}
          activeClassName={'header-nav-link-active'}
        >{item.name}</NavLink>
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