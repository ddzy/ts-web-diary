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


export interface IArticleProps {};
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
        />
      </ArticleWrapper>
    );
  }

}


export default Article;