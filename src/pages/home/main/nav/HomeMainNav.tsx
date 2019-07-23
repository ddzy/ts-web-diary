import * as React from 'react';
import {
  withRouter,
  NavLink,
} from 'react-router-dom';
import {
  Affix,
} from 'antd';

import {
  GlobalStyle,
  NavWrapper,
  NavContent,
  NavContentList,
  NavContentListItem,
} from './style';
import {
  ARTICLE_TYPE_PICKER,
  ARTICLE_TYPE_WITH_ENGLISH_PICKER,
} from 'constants/constants';


export interface IHomeMainNavProps {};


const HomeMainNav = React.memo<IHomeMainNavProps>((
  props: IHomeMainNavProps,
) => {
  /**
   * 处理初始化导航列表项
   */
  function handleInitNavItem(): JSX.Element[] {
    return ARTICLE_TYPE_PICKER.map((v: string, i: number) => (
      <NavContentListItem
        key={i}
        data-type={ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}
      >
        <NavLink
          strict
          activeClassName={'home-nav-link-active'}
          to={`/home/${ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}`}
        >
          {v}
        </NavLink>
      </NavContentListItem>
    ));
  }

  return (
    <React.Fragment>
      <Affix
        offsetTop={60}
      >
        <NavWrapper id="home-nav-bar">
          <NavContent>
            <NavContentList>
              {handleInitNavItem()}
            </NavContentList>
          </NavContent>
        </NavWrapper>
      </Affix>

      {/* Global Style */}
      <GlobalStyle />
    </React.Fragment>
  );

});


export default withRouter(HomeMainNav);