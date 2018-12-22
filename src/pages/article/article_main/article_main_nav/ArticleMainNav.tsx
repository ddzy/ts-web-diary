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
  PAGE_SIZE,
} from '../../../../constants/constants';


export interface IArticleMainNavProps extends RouteComponentProps<IArticleMainNavProps> {
  onGetArticleList: (
    type: string,
    page: number,
    pageSize: number,
  ) => void;
};


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
        data-type={ARTICLE_TYPE_WITH_ENGLISH_PICKER[i]}
        onClick={() => handleNavItemClick(ARTICLE_TYPE_WITH_ENGLISH_PICKER[i])}
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

  /**
   * 处理导航点击
   */
  function handleNavItemClick(
    type: string,
  ): void {
    props.onGetArticleList(type, 1, PAGE_SIZE);
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