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
import HeaderMain from './header_main/HeaderMain';
import {
  serviceHandleGetUserSearchArticles,
} from './Header.service';


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
  const [
    searchState,
    setSearchState,
  ] = React.useState({
    searchedArticles: [],
    hotTags: {},
  });

  /**
   * 处理搜索框change
   */
  function handleSearch(e: any): void {
    serviceHandleGetUserSearchArticles(
      e.target.value,
      (data) => {
        setSearchState({
          searchedArticles: data,
          hotTags: {},
        });
      }
    );
  }

  return (
    <Affix>
      <HeaderWrapper>
        <HeaderMain
          authInfo={{ ...props.AuthRouteReducer }}

          searchedArticles={searchState.searchedArticles}
          hotTags={searchState.hotTags}
          onSearch={handleSearch}

          location={props.location}
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