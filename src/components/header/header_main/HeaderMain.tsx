import * as React from 'react';

import {
  MainContainer,
  MainInner,
  MainOuter,
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
interface IHeaderMainState {};


class HeaderMain extends React.PureComponent<
  IHeaderMainProps,
  IHeaderMainState
  > {

  public readonly state: IHeaderMainState = {};
  public innerWrapperRef: any = React.createRef();

  public componentDidMount(): void {
    console.log(this.innerWrapperRef.current.localName);
  }

  public render(): JSX.Element {
    return (
      <MainContainer
        ref={this.innerWrapperRef}
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
          <div style={{ flex: 5 }}>
            搜索框
          </div>
          <div style={{ flex: 3 }}>
            头像框
          </div>
        </MainOuter>
      </MainContainer>
    );
  }
}


export default HeaderMain;