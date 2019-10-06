import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Card,
} from 'antd';

import {
  ArticleWrapper,
  ArticleMain,
  ArticleMainTitleBox,
  ArticleMainContentBox,
  ArticleMainContentText,
  ArticleMainExtraBox,
} from './style';
import {
  IBaseCommonTrackCreateArticleInfo,
} from 'pages/user/User.types';
import { formatTime } from 'utils/utils';


export interface IUserMainContentTrackCreateArticleProps extends RouteComponentProps {
  // ? 发表文章的足迹相关信息
  trackInfo: IBaseCommonTrackCreateArticleInfo;
};
export interface IUserMainContentTrackCreateArticleState { };


const UserMainContentTrackCreateArticle = React.memo((props: IUserMainContentTrackCreateArticleProps) => {
  /**
   * [初始化] - 卡片标题
   */
  function _initCardTitle() {
    return (
      <ArticleMainTitleBox>
        发表了文章
      </ArticleMainTitleBox>
    );
  }

  /**
   * [初始化] - 卡片内容
   */
  function _initCardContent() {
    return (
      <ArticleMainContentBox>
        <ArticleMainContentText
          onClick={handleCardContentClick}
        >
          {props.trackInfo.article.title}
        </ArticleMainContentText>
      </ArticleMainContentBox>
    );
  }

  /**
   * [初始化] - 卡片的额外区域
   */
  function _initCardExtra() {
    return (
      <ArticleMainExtraBox>
        {formatTime(props.trackInfo.create_time)}
      </ArticleMainExtraBox>
    );
  }

  /**
   * [处理] - 当前主人发表的文章点击, 进入该文章的详情页
   */
  function handleCardContentClick() {
    const createArticleId = props.trackInfo.article._id;

    props.history.push(`/details/${createArticleId}`);
  }

  return (
    <ArticleWrapper>
      <ArticleMain>
        <Card
          style={{
            width: '100%'
          }}
          title={_initCardTitle()}
          extra={_initCardExtra()}
        >
          {_initCardContent()}
        </Card>
      </ArticleMain>
    </ArticleWrapper>
  );
});


export default withRouter(UserMainContentTrackCreateArticle);