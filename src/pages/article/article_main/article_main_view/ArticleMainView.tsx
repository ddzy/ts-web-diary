import * as React from 'react';

import {
  ViewWrapper,
  ViewContent,
} from './style';
import ArticleMainViewPosts from './article_main_view_posts/ArticleMainViewPosts';


export interface IArticleMainViewProps {
  articles: any[];
  onLoadMore: (
    page: number,
    pageSize: number,
    callback?: (...args: any[]) => void,
  ) => void;
};
interface IArticleMainViewState { };


class ArticleMainView extends React.PureComponent<IArticleMainViewProps, IArticleMainViewState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ViewWrapper>
          <ViewContent>
            {/* 文章展示 */}
            <ArticleMainViewPosts
              articles={this.props.articles}
              onLoadMore={this.props.onLoadMore}
            />
          </ViewContent>
        </ViewWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMainView;