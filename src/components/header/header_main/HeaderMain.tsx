import * as React from 'react';

import {
  MainContainer,
} from './style';
import HeaderMainLogo from './header_main_logo/HeaderMainLogo';
import HeaderMainNav from './header_main_nav/HeaderMainNav';
import HeaderMainAction from './header_main_action/HeaderMainAction';


export interface IHeaderMainProps {
  authInfo: {
    isAuth: boolean;
    useravatar: string;
    username: string;
  };
};


class HeaderMain extends React.PureComponent<IHeaderMainProps> {
  public render(): JSX.Element {
    return (
      <MainContainer>
        <HeaderMainLogo />
        <HeaderMainNav />
        <HeaderMainAction
          authInfo={this.props.authInfo}
        />
      </MainContainer>
    );
  }
}


export default HeaderMain;