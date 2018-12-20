import * as React from 'react';

import {
  ViewWrapper,
  ViewContent,
} from './style';
import ArticleMainViewPosts from './article_main_view_posts/ArticleMainViewPosts';


export interface IArticleMainViewProps { };
interface IArticleMainViewState { };


class ArticleMainView extends React.PureComponent<IArticleMainViewProps, IArticleMainViewState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ViewWrapper>
          <ViewContent>
            {/* 文章展示 */}
            <ArticleMainViewPosts />
          </ViewContent>
        </ViewWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMainView;