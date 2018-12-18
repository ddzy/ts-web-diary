import * as React from 'react';
import { connect } from 'react-redux';
import {
  Affix,
} from 'antd';

import {
  HeaderWrapper,
} from './style';
import HeaderMain from './header_main/HeaderMain';
import {
  reduxHandleGetUserSearchArticles,
} from './Header.redux';


export interface IHeaderProps {
  AuthRouteReducer: {
    isAuth: boolean;
    username: string;
    useravatar: string;
  };

  reduxHandleGetUserSearchArticles: (
    v: string,
  ) => void;
};


const Header: React.SFC<IHeaderProps> = (
  props: IHeaderProps,
): JSX.Element => {

  /**
   * 处理搜索
   */
  function handleSearch(e: any): void {
    props.reduxHandleGetUserSearchArticles(
      e.target.value,
    );
  }

  return (
    <Affix
      offsetTop={1}
    >
      <HeaderWrapper>
        <HeaderMain
          authInfo={{ ...props.AuthRouteReducer }}
          onSearch={handleSearch}
        />
      </HeaderWrapper>
    </Affix>
  );
}


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
    HeaderReducer: state.HeaderReducer,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleGetUserSearchArticles,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Header) as React.ComponentClass<any>;