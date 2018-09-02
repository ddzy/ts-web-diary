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
  ) => void;     // 加载更多
};
interface IMainState {};



class Main extends React.PureComponent<IMainProps, IMainState> {

  public readonly state = {}


  //// 处理点赞
  public handleChangeStar = (
    e: React.MouseEvent,
  ): void => {
    const types: any = ['like', 'like-o'];
    const target = e.currentTarget as HTMLSpanElement;

    // 实时显示
    if (types.includes(
      target.getAttribute('data-type')
    )) {
      target.classList.toggle('star-active');
      // 
      const textNode = target.lastElementChild as HTMLSpanElement;

      textNode.innerHTML = target.classList.contains('star-active')
        ? (Number(textNode.textContent) + 1).toString()
        : (Number(textNode.textContent) - 1).toString();

      // 提交后台
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
      <MainWrapper>
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