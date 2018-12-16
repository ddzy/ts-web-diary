import * as React from 'react';

import {
  MainContainer,
  MainInner,
  MainOuter,
} from './style';
import HeaderMainLogo from './header_main_logo/HeaderMainLogo';
import HeaderMainNav from './header_main_nav/HeaderMainNav';
import HeaderMainAction from './header_main_action/HeaderMainAction';
import HeaderMainSearch from './header_main_search/HeaderMainSearch';
import HeaderMainNotification from './header_main_notification/HeaderMainNotification';


export interface IHeaderMainProps {
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  };
};
interface IHeaderMainState {};


class HeaderMain extends React.PureComponent<
  IHeaderMainProps,
  IHeaderMainState
  > {

  public readonly state: IHeaderMainState = {};

  public render(): JSX.Element {
    return (
      <MainContainer
        id="header-main-container"
      >
        <MainInner>
          <HeaderMainLogo />
          <HeaderMainNav />
          <HeaderMainAction
            authInfo={this.props.authInfo}
          />
        </MainInner>
        <MainOuter>
          <HeaderMainLogo />
          <HeaderMainSearch />
          <HeaderMainNotification />
          <div style={{ flex: 2 }}>
            聊天室
          </div>
        </MainOuter>
      </MainContainer>
    );
  }
}


export default HeaderMain;