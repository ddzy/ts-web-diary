import * as React from 'react';
import {
  withRouter,
  Link,
  RouteComponentProps,
} from 'react-router-dom';

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


export interface IArticleMainNavProps extends RouteComponentProps<IArticleMainNavProps> {};


const ArticleMainNav = React.memo<IArticleMainNavProps>((
  props: IArticleMainNavProps,
) => {

  /**
   * 处理初始化导航列表项
   */
  function handleInitNavItem(): JSX.Element[] {
    const pathName: string = props.location.pathname;

    return ARTICLE_TYPE_PICKER.map((v: string, i: number) => (
      <NavContentListItem
        key={i}
        data-type={v}
      >
        <Link
          className={
            `/article/${ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}` === pathName
              ? 'article-nav-item-active'
              : 'article-nav-item-default'
          }
          to={`/article/${ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}`}
        >
          {v}
        </Link>
      </NavContentListItem>
    ));
  }

  return (
    <React.Fragment>
      <NavWrapper>
        <NavContent>
          <NavContentList>
            {handleInitNavItem()}
          </NavContentList>
        </NavContent>
      </NavWrapper>

      {/* Global Style */}
      <GlobalStyle />
    </React.Fragment>
  );

});


export default withRouter(ArticleMainNav);