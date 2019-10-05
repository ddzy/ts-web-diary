import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Card,
} from 'antd';

import {
  SelfWrapper,
  SelfMain,
  SelfMainTitleBox,
  SelfMainExtraBox,
  SelfMainContentBox,
  SelfMainContentText,
} from './style';
import {
  IBaseCommonTrackStarArticleInfo,
} from 'pages/user/User.types';
import { formatTime } from 'utils/utils';


export interface IUserMainContentTrackStarArticleSelfProps extends RouteComponentProps {
  // ? 点赞文章的足迹相关信息
  trackInfo: IBaseCommonTrackStarArticleInfo;
};
export interface IUserMainContentTrackStarArticleSelfState { };


const UserMainContentTrackStarArticleSelf = React.memo((props: IUserMainContentTrackStarArticleSelfProps) => {
  /**
   * [初始化] - 卡片标题
   */
  function _initCardTitle() {
    return (
      <SelfMainTitleBox>
        赞了文章
      </SelfMainTitleBox>
    );
  }

  /**
   * [初始化] - 卡片内容
   */
  function _initCardContent() {
    return (
      <SelfMainContentBox>
        <SelfMainContentText
          onClick={handleCardContentClick}
        >
          {props.trackInfo.article.title}
        </SelfMainContentText>
      </SelfMainContentBox>
    );
  }

  /**
   * [初始化] - 卡片的额外区域
   */
  function _initCardExtra() {
    return (
      <SelfMainExtraBox>
        {formatTime(props.trackInfo.create_time)}
      </SelfMainExtraBox>
    );
  }

  /**
   * [处理] - 当前主人赞过的文章点击, 进入该文章的详情页
   */
  function handleCardContentClick() {
    const starArticleId = props.trackInfo.article._id;

    props.history.push(`/details/${starArticleId}`);
  }

  return (
    <SelfWrapper>
      <SelfMain>
        <Card
          style={{
            width: '100%'
          }}
          title={_initCardTitle()}
          extra={_initCardExtra()}
        >
          {_initCardContent()}
        </Card>
      </SelfMain>
    </SelfWrapper>
  );
});


export default withRouter(UserMainContentTrackStarArticleSelf);