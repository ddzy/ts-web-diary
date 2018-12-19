import * as React from 'react';

import Header from '../../components/header/Header';
import ArticleMain from './article_main/ArticleMain';
import {
  IStaticOptions,
  serviceHandleGetArticleList,
  serviceHandleArticleLoadMore,
} from './Article.service';


export interface IArticleProps {};
interface IArticleState {
  serviceState: IStaticOptions;
  hasMore: boolean;
};


class Article extends React.Component<IArticleProps, IArticleState> {

  public readonly state = {
    serviceState: {
      article_list: [],
    },
    hasMore: true,
  }

  public componentDidMount(): void {
    serviceHandleGetArticleList((data) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          serviceState: {
            ...prevState.serviceState,
            article_list: data,
          },
        };
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
        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              ...data,
            },
          };
        });
      }
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        {/* <Main
          showTab={true}
          articleList={this.state.serviceState.article_list}
          onLoadMore={this.handleLoadMore}
          hasMore={this.state.hasMore}
        /> */}

        {/* -------------------------------------- */}
        {/* 重构 */}
        {/* -------------------------------------- */}
        <ArticleMain />

      </React.Fragment>
    );
  }

}


export default Article;