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
  PeopleWrapper,
  PeopleMain,
  PeopleMainTitleBox,
  PeopleMainExtraBox,
  PeopleMainContentBox,
} from './style';
import {
  IBaseCommonTrackAttentionPeopleInfo,
} from 'pages/user/User.types';
import { formatTime } from 'utils/utils';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface IUserMainContentTrackAttentionPeopleProps extends RouteComponentProps {
  // ? 关注用户的足迹相关信息
  trackInfo: IBaseCommonTrackAttentionPeopleInfo;
};
export interface IUserMainContentTrackAttentionPeopleState { };


const UserMainContentTrackAttentionPeople = React.memo((props: IUserMainContentTrackAttentionPeopleProps) => {
  /**
   * [初始化] - 卡片标题
   */
  function _initCardTitle() {
    return (
      <PeopleMainTitleBox>
        关注了用户
      </PeopleMainTitleBox>
    );
  }

  /**
   * [初始化] - 卡片内容
   */
  function _initCardContent() {
    return (
      <PeopleMainContentBox
        onClick={handleCardContentClick}
      >
        <BaseGoodsDisplay
          cover={
            <Avatar
              size={60}
              shape="square"
              icon="user"
              src={props.trackInfo.user.useravatar}
            />
          }
          title={
            <span>
              {props.trackInfo.user.username}
            </span>
          }
          content={<React.Fragment />}
          action={
            <span>
              {
                props.trackInfo.user.job
                || props.trackInfo.user.website
                || props.trackInfo.user.education
                || '保密'
              }
            </span>
          }
        />
      </PeopleMainContentBox>
    );
  }

  /**
   * [初始化] - 卡片的额外区域
   */
  function _initCardExtra() {
    return (
      <PeopleMainExtraBox>
        {formatTime(props.trackInfo.create_time)}
      </PeopleMainExtraBox>
    );
  }

  /**
   * [处理] - 点击当前主人关注的用户, 跳转至该用户的个人中心
   */
  function handleCardContentClick() {
    const attentionUserId = props.trackInfo.user._id;

    props.history.push(`/user/${attentionUserId}`);
  }

  return (
    <PeopleWrapper>
      <PeopleMain>
        <Card
          style={{
            width: '100%'
          }}
          title={_initCardTitle()}
          extra={_initCardExtra()}
        >
          {_initCardContent()}
        </Card>
      </PeopleMain>
    </PeopleWrapper>
  );
});


export default withRouter(UserMainContentTrackAttentionPeople);