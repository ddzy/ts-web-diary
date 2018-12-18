import * as React from 'react';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';

import {
  serviceHandleGetArticleList,
  serviceHandleArticleLoadMore,
} from './Article.service';


export interface IArticleProps {};
interface IArticleState {
  article_list: object[];
  hasMore: boolean;
};


class Article extends React.Component<IArticleProps, IArticleState> {

  public readonly state = {
    article_list: [],
    hasMore: true,
  }

  public componentDidMount(): void {
    serviceHandleGetArticleList((data) => {
      this.setState({
        article_list: data,
      });
    });
  }

  /**
   * 处理加载更多
   */
  public handleLoadMore = (
    page: number,
    pageSize: number,
  ) => {
    serviceHandleArticleLoadMore(
      page,
      pageSize,
      (data) => {
        this.setState({
          article_list: data.articleList,
          hasMore: data.hasMore
        });
      }
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        <Main
          showTab={true}
          articleList={this.state.article_list}
          onLoadMore={this.handleLoadMore}
          hasMore={this.state.hasMore}
        />
      </React.Fragment>
    );
  }

}


export default Article;