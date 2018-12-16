import * as React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import MainCarousel from './main_carousel/MainCarousel';
import MainArtical from './main_artical/MainArtical';
import { reduxHandleStar } from '../../pages/article/Article.redux';
import {
  MainWrapper,
  MainContent,
  ContentWrapper,
} from './style';




export interface IMainProps {
  showTab: boolean;      // 区分首页 & 文章页
  articleList?: any[];   // 新闻列表
  targetUser?: string;     // 点赞目标
  hasMore?: boolean;      // 是否还有更多

  reduxHandleStar: (      // 处理点赞
    star: boolean,
    articleid: string,
    callback: () => void,
  ) => void;

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

  /**
   * 处理点赞
   */
  public handleChangeStar = (
    e: React.MouseEvent,
  ): void => {
    const types: any = ['like', 'like-o'];
    const target = e.currentTarget as HTMLSpanElement;

    // ** 实时显示 **
    if (types.includes(
      target.getAttribute('data-type')
    )) {
      target.classList.toggle('star-active');
      //
      const textNode = target.lastElementChild as HTMLSpanElement;

      textNode.innerHTML = target.classList.contains('star-active')
        ? (Number(textNode.textContent) + 1).toString()
        : (Number(textNode.textContent) - 1).toString();

      // ** 提交后台 **
      this.props.reduxHandleStar(
        target.classList.contains('star-active'),
        target.getAttribute('data-id') || '',
        () => {
          this.props.targetUser
            && target.classList.contains('star-active')
            ? message.info(`你赞了: ${this.props.targetUser}的文章`)
            : message.info(`你取消了赞`);
        }
      );
    }
  }


  public render(): JSX.Element {
    return (
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
              onChangeStar={this.handleChangeStar}
              onLoadMore={this.props.onLoadMore}
              hasMore={this.props.hasMore}
            />
          </ContentWrapper>
        </MainContent>
      </MainWrapper>
    );
  }

}


function mapStateToProps(state: any) {
  return {
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleStar,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Main);