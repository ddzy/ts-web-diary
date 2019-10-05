import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Card,
  Avatar,
} from 'antd';

import {
  TopicWrapper,
  TopicMain,
  TopicMainTitleBox,
  TopicMainExtraBox,
  TopicMainContentBox,
} from './style';
import {
  IBaseCommonTrackAttentionTopicInfo,
} from 'pages/user/User.types';
import { formatTime } from 'utils/utils';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface IUserMainContentTrackAttentionTopicProps extends RouteComponentProps {
  // ? 关注话题的足迹相关信息
  trackInfo: IBaseCommonTrackAttentionTopicInfo;
};
export interface IUserMainContentTrackAttentionTopicState { };


const UserMainContentTrackAttentionTopic = React.memo((props: IUserMainContentTrackAttentionTopicProps) => {
  /**
   * [初始化] - 卡片标题
   */
  function _initCardTitle() {
    return (
      <TopicMainTitleBox>
        关注了话题
      </TopicMainTitleBox>
    );
  }

  /**
   * [初始化] - 卡片内容
   */
  function _initCardContent() {
    return (
      <TopicMainContentBox
        onClick={handleCardContentClick}
      >
        <BaseGoodsDisplay
          cover={
            <Avatar
              size={60}
              shape="square"
              icon="user"
              src={props.trackInfo.topic.cover_img}
            />
          }
          title={
            <span>
              {props.trackInfo.topic.name}
            </span>
          }
          content={<React.Fragment />}
          action={
            <span>
              {
                props.trackInfo.topic.description
              }
            </span>
          }
        />
      </TopicMainContentBox>
    );
  }

  /**
   * [初始化] - 卡片的额外区域
   */
  function _initCardExtra() {
    return (
      <TopicMainExtraBox>
        {formatTime(props.trackInfo.create_time)}
      </TopicMainExtraBox>
    );
  }

  /**
   * [处理] - 当前主人关注的话题点击, 跳转至该话题详情页
   */
  function handleCardContentClick() {
    const attentionTopicId = props.trackInfo.topic._id;

    props.history.push(`/topic/${attentionTopicId}`);
  }

  return (
    <TopicWrapper>
      <TopicMain>
        <Card
          style={{
            width: '100%'
          }}
          title={_initCardTitle()}
          extra={_initCardExtra()}
        >
          {_initCardContent()}
        </Card>
      </TopicMain>
    </TopicWrapper>
  );
});


export default withRouter(UserMainContentTrackAttentionTopic);