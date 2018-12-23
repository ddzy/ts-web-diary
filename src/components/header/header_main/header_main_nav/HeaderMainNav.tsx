import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
  Link,
} from 'react-router-dom';

import {
  GlobalStyleSet,
  MainNavContainer,
  MainNavItem,
  MainNavList,
} from './style';
import headerNavConfig from '../../../../config/headerNav.config';


export interface IHeaderMainNavProps extends RouteComponentProps<IHeaderMainNavProps> { };
interface IHeaderMainNavState {};


class HeaderMainNav extends React.PureComponent<IHeaderMainNavProps, IHeaderMainNavState> {

  public readonly state: IHeaderMainNavState = {}

  public componentDidMount(): void {
    this.handleSetNavItemStyle();
  }

  public handleSetNavItemStyle = (): void => {
    const {
      pathname,
    } = this.props.location;

    // 默认选中菜单栏
    const oUl = document.getElementById('header-navbar');
    const oLi = oUl && oUl.querySelectorAll('li');

    oLi && Array.from(oLi).forEach((item) => {
      pathname.includes(item.getAttribute('data-pane') || '')
        && item.classList.add('header-active');
    });

  }

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


export default withRouter(HeaderMainNav);