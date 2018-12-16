import * as React from 'react';
import { connect } from 'react-redux';
import {
  Affix,
} from 'antd';

import {
  HeaderWrapper,
} from './style';
import HeaderMain from './header_main/HeaderMain';


export interface IHeaderProps {
  AuthRouteReducer: {
    isAuth: boolean;
    username: string;
    useravatar: string;
  };
};


const Header: React.SFC<IHeaderProps> = (
  props: IHeaderProps,
): JSX.Element => {
  return (
    <Affix
      offsetTop={1}
    >
      <HeaderWrapper>
        <HeaderMain
          authInfo={{...props.AuthRouteReducer}}
        />
      </HeaderWrapper>
    </Affix>
  );
}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default connect(
  mapStateToProps,
)(Header) as React.ComponentClass<any>;