import * as React from 'react';
import {
  withRouter,
  Link,
  RouteComponentProps,
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
} from '../../../../constants/constants';


export interface IHomeMainNavProps extends RouteComponentProps<any> {};


const HomeMainNav = React.memo<IHomeMainNavProps>((
  props: IHomeMainNavProps,
) => {
  /**
   * 处理初始化导航列表项
   */
  function handleInitNavItem(): JSX.Element[] {
    const pathName: string = props.location.pathname;

    return ARTICLE_TYPE_PICKER.map((v: string, i: number) => (
      <NavContentListItem
        key={i}
        data-type={ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}
      >
        <Link
          className={
            `/home/${ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}` === pathName
              ? 'article-nav-item-active'
              : 'article-nav-item-default'
          }
          to={`/home/${ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}`}
        >
          {v}
        </Link>
      </NavContentListItem>
    ));
  }

  return (
    <React.Fragment>
      <Affix
        offsetTop={60}
      >
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