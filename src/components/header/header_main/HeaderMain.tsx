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
          <div style={{ flex: 3 }}>
            头像框
          </div>
        </MainOuter>
      </MainContainer>
    );
  }
}


export default HeaderMain;