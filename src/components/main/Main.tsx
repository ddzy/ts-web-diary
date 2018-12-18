import * as React from 'react';

import MainCarousel from './main_carousel/MainCarousel';
import MainArtical from './main_artical/MainArtical';
import {
  GlobalStyleSet,
  MainWrapper,
  MainContent,
  ContentWrapper,
} from './style';


export interface IMainProps {
  showTab: boolean;      // 区分首页 & 文章页
  articleList?: any[];   // 新闻列表
  hasMore?: boolean;      // 是否还有更多

  onLoadMore: (
    page: number,
    pageSize: number,
    callback?: () => void,
  ) => void;
};
interface IMainState { };



class Main extends React.PureComponent<IMainProps, IMainState> {

  public readonly state = {}
  public readonly oWrapperRef: React.Ref<any> = React.createRef();

  public componentDidMount(): void {
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
        nWheelDeltaY < 0 ? '-3.125rem' : 0
      });
    `;
  }

  /**
   * 辅助函数, 处理mousewheel --- end
   */
  public _aidedHandleArticleWrapperWheelEnd = () => {
    const oWrapperRef = this.oWrapperRef as any;
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
    const oWrapperRef = this.oWrapperRef as any;
    const oWrapperCurrent = oWrapperRef.current as HTMLDivElement;

    oWrapperCurrent.addEventListener(
      'wheel',
      this._aidedHandleArticleWrapperWheelStart,
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MainWrapper
          ref={this.oWrapperRef}
        >
          <MainContent>
            <ContentWrapper>
              {/* 轮播区域 */}
              {
                !this.props.showTab && <MainCarousel />
              }

              {/* 文章区域 */}
              <MainArtical
                showTab={this.props.showTab}
                articleList={this.props.articleList}
                onLoadMore={this.props.onLoadMore}
                hasMore={this.props.hasMore}
              />
            </ContentWrapper>
          </MainContent>
        </MainWrapper>

        {/* Global Style Set */}
        <GlobalStyleSet />
      </React.Fragment>
    );
  }

}


export default Main;