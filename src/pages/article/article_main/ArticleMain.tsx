import * as React from 'react';

import ArticleMainNav from './article_main_nav/ArticleMainNav';
import ArticleMainView from './article_main_view/ArticleMainView';
import {
  MainWrapper,
  MainContent,
} from './style';


export interface IArticleMainProps {
  articles: any[];
  onGetArticleList: (
    type: string,
    page: number,
    pageSize: number,
  ) => void;
  onLoadMore: (
    page: number,
    pageSize: number,
    callback?: (...args: any[]) => void,
  ) => void,
};
interface IArticleMainState { };


class ArticleMain extends React.PureComponent<IArticleMainProps, IArticleMainState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MainWrapper>
          <MainContent>
            <ArticleMainNav
              onGetArticleList={this.props.onGetArticleList}
            />
            <ArticleMainView
              articles={this.props.articles}
              onLoadMore={this.props.onLoadMore}
            />
          </MainContent>
        </MainWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMain;