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
  serviceHandleGetUserSearchArticles,
} from './Header.service';


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

  const [
    searchedArticles,
    setSearchedArticles,
  ] = React.useState({
    searchedArticles: [],
  });

  /**
   * 处理搜索
   */
  function handleSearch(e: any): void {
    serviceHandleGetUserSearchArticles(
      e.target.value,
      (data) => {
        setSearchedArticles({
          searchedArticles: data,
        });
      }
    );
  }

  return (
    <Affix
      offsetTop={1}
    >
      <HeaderWrapper>
        <HeaderMain
          authInfo={{ ...props.AuthRouteReducer }}

          searchedArticles={searchedArticles.searchedArticles}
          onSearch={handleSearch}
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