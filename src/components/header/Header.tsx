import * as React from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Affix,
} from 'antd';

import {
  HeaderWrapper,
} from './style';
import HeaderMain from './main/HeaderMain';


export interface IHeaderProps extends RouteComponentProps {
  AuthRouteReducer: {
    isAuth: boolean;
    username: string;
    useravatar: string;
  };
};

const Header = React.memo<IHeaderProps>((
  props: IHeaderProps,
): JSX.Element => {
  return (
    <Affix>
      <HeaderWrapper>
        <HeaderMain
          authInfo={{ ...props.AuthRouteReducer }}
        />
      </HeaderWrapper>
    </Affix>
  );
});

function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default withRouter(connect(
  mapStateToProps,
)(Header) as React.ComponentClass<any>);