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
import generateArticleTypeNavConfig from 'config/articleTypeNav.config';


export interface IHomeMainNavProps {};


const HomeMainNav = React.memo<IHomeMainNavProps>((
  props: IHomeMainNavProps,
) => {
  /**
   * 处理初始化导航列表项
   */
  function handleInitNavItem(): JSX.Element[] {
    const articleTypeNav = generateArticleTypeNavConfig();

    return articleTypeNav.map((v, i) => (
      <NavContentListItem
        key={i}
        data-type={v.type}
      >
        <NavLink
          strict
          activeStyle={{
            color: '#1DA57A',
          }}
          to={v.path}
        >
          {v.name}
        </NavLink>
      </NavContentListItem>
    ));
  }

  return (
    <React.Fragment>
      <Affix offsetTop={55}>
        <NavWrapper>
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