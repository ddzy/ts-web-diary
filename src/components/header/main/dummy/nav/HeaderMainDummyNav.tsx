import * as React from 'react';
import {
  NavLink,
  withRouter,
} from 'react-router-dom';

import {
  GlobalStyleSet,
  MainNavContainer,
  MainNavItem,
  MainNavList,
} from './style';
import headerNavConfig from 'config/headerNav.config';


export interface IHeaderMainDummyNavProps {};

const HeaderMainDummyNav = React.memo(() => {
  /**
   * 初始化 - 一级菜单栏
   */
  const _initHeaderNavList = (): JSX.Element[] => {
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

  return (
    <React.Fragment>
      <MainNavContainer>
        <MainNavList id="header-navbar">
          {_initHeaderNavList()}
        </MainNavList>
      </MainNavContainer>

      {/* Global Style Set */}
      <GlobalStyleSet />
    </React.Fragment>
  );
});


export default withRouter(HeaderMainDummyNav);