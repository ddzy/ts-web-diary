import * as React from 'react';

import Header from '../../components/header/Header';
import ArticleMain from './article_main/ArticleMain';
import {
  IStaticOptions,
  serviceHandleGetArticleList,
  // serviceHandleArticleLoadMore,
} from './Article.service';
import {
  ArticleWrapper,
} from './style';


export interface IArticleProps {
  location: Location;
};
interface IArticleState {
  serviceState: IStaticOptions;
  hasMore: boolean;
};


class Article extends React.Component<IArticleProps, IArticleState> {

  public readonly oMainWrapperRef: React.Ref<any> = React.createRef();

  public readonly state = {
    serviceState: {
      article_list: [],
    },
    hasMore: true,
  }

  public componentDidMount(): void {
    // serviceHandleGetArticleList((data) => {
    //   this.setState((prevState) => {
    //     return {
    //       ...prevState,
    //       serviceState: {
    //         ...prevState.serviceState,
    //         article_list: data,
    //       },
    //     };
    //   });
    // });

    const {
      pathname
    } = this.props.location;
    const type = pathname.replace('/article/', '');

    this.handelGetArticleList(type, 1, 5);
    this.handleArticleWrapperWheel();
  }

  public componentWillUnmount(): void {
    this._aidedHandleArticleWrapperWheelEnd();
  }

  /**
   * 辅助函数, 处理mousewheel --- start
   */
  public _aidedHandleArticleWrapperWheelStart = (
    e: any,
  ): void => {
    const nWheelDeltaY = e.wheelDeltaY as number
    const oHeaderContainer = document
      .querySelector('#header-main-container') as HTMLDivElement;

    // ** 处理header滚动 **
    oHeaderContainer.style.cssText += `
      transform: translateY(${
      nWheelDeltaY < 0 ? '-100%' : 0
      });
    `;
  }

  /**
   * 辅助函数, 处理mousewheel --- end
   */
  public _aidedHandleArticleWrapperWheelEnd = () => {
    const oWrapperRef = this.oMainWrapperRef as any;
    const oWrapperCurrent = oWrapperRef.current as HTMLDivElement;

    oWrapperCurrent.removeEventListener(
      'wheel',
      this._aidedHandleArticleWrapperWheelStart,
    );
  }

  /**
   * 处理article页滚动
   */
  public handleArticleWrapperWheel = (): void => {
    const oWrapperRef = this.oMainWrapperRef as any;
    const oWrapperCurrent = oWrapperRef.current as HTMLDivElement;

    oWrapperCurrent.addEventListener(
      'wheel',
      this._aidedHandleArticleWrapperWheelStart,
    );
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
        this.setState((prevState) => {
          return {
            ...prevState,
            serviceState: {
              ...prevState.serviceState,
              article_list: data,
            },
          };
        });
      },
    );
  }

  /**
   * 处理加载更多
   */
  // public handleLoadMoreArticleList(
  //   page: number,
  //   pageSize: number,
  //   callback?: (...args: any[]) => void,
  // ): void {
  //   serviceHandleGetArticleList(
  //     { type: 'frontend', page, pageSize },
  //     (data) => {
  //       callback && callback();
  //       this.setState((prevState) => {
  //         return {
  //           serviceState: {
  //             ...prevState.serviceState,
  //             article_list: prevState.serviceState.article_list.concat(data),
  //           },
  //         };
  //       });
  //     },
  //   );
  // }
  public handleLoadMoreArticleList = (
    page: number,
    pageSize: number,
    callback?: (...args: any[]) => void,
  ): void => {
    const {
      pathname,
    } = this.props.location;
    const type: string = pathname.replace('/article/', '');

    serviceHandleGetArticleList(
      { type, page, pageSize },
      (data) => {
        callback && callback(data);
        this.setState((prevState) => {
          return {
            serviceState: {
              ...prevState.serviceState,
              article_list: prevState.serviceState.article_list.concat(data),
            },
          };
        });
      },
    );
  }

  public render(): JSX.Element {
    return (
      <ArticleWrapper
        ref={this.oMainWrapperRef}
      >
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
        <ArticleMain
          articles={this.state.serviceState.article_list}
          onGetArticleList={this.handelGetArticleList}
          onLoadMore={this.handleLoadMoreArticleList}
        />
      </ArticleWrapper>
    );
  }

}


export default Article;