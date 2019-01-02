import * as React from 'react';

import HomeMain from './home_main/HomeMain';
import {
  IStaticOptions,
  serviceHandleGetArticleList,
} from './Home.service';
import {
  HomeWrapper,
} from './style';
import { PAGE_SIZE } from 'src/constants/constants';


export interface IArticleProps {
  location: Location;
};
interface IArticleState {
  serviceState: IStaticOptions;
  hasMore: boolean;
  initialLoading: boolean;
};


class Article extends React.Component<IArticleProps, IArticleState> {

  public readonly state = {
    serviceState: {
      article_list: [],
    },
    hasMore: true,
    initialLoading: true,
  }

  public componentDidMount(): void {
    const {
      pathname
    } = this.props.location;
    const type = pathname.replace('/home/', '');

    this.handelGetArticleList(type, 1, PAGE_SIZE);
  }

  /**
   * 处理点击navitem, 获取相关文章
   */
  public handelGetArticleList = (
    type: string,
    page: number,
    pageSize: number,
  ): void => {
    serviceHandleGetArticleList(
      { type, page, pageSize },
      (data) => {
        const {
          articleList,
        } = data;

        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              article_list: articleList,
            },
            initialLoading: false,
          };
        });
      },
    );
  }

  /**
   * 处理加载更多
   */
  public handleLoadMoreArticleList = (
    page: number,
    pageSize: number,
    callback?: (...args: any[]) => void,
  ): void => {
    const {
      pathname,
    } = this.props.location;
    const type: string = pathname.replace('/home/', '');

    serviceHandleGetArticleList(
      { type, page, pageSize },
      (data) => {
        callback && callback(data);
        this.setState((prevState) => {
          return {
            serviceState: {
              ...prevState.serviceState,
              article_list: prevState.serviceState.article_list.concat(data.articleList),
            },
          };
        });
      },
    );
  }

  public render(): JSX.Element {
    return (
      <HomeWrapper
      >
        <HomeMain
          initialLoading={this.state.initialLoading}
          articles={this.state.serviceState.article_list}
          onGetArticleList={this.handelGetArticleList}
          onLoadMore={this.handleLoadMoreArticleList}
        />
      </HomeWrapper>
    );
  }

}


export default Article;