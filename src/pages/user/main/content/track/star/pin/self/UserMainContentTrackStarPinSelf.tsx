import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
  NavLink,
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
  IBaseCommonTrackStarPinInfo,
} from 'pages/user/User.types';
import { formatTime } from 'utils/utils';


export interface IUserMainContentTrackStarPinSelfProps extends RouteComponentProps {
  // ? 点赞沸点的足迹相关信息
  trackInfo: IBaseCommonTrackStarPinInfo;
};
export interface IUserMainContentTrackStarPinSelfState { };


const UserMainContentTrackStarPinSelf = React.memo((props: IUserMainContentTrackStarPinSelfProps) => {
  /**
   * [初始化] - 卡片标题
   */
  function _initCardTitle() {
    return (
      <SelfMainTitleBox>
        赞了
      </SelfMainTitleBox>
    );
  }

  /**
   * [初始化] - 卡片内容
   */
  function _initCardContent() {
    return (
      <SelfMainContentBox>
        <SelfMainContentText>
          用户
          <NavLink
            to={`/user/${props.trackInfo.pin_author._id}`}
          >  {props.trackInfo.pin_author.username}  </NavLink>
          发表的
          <NavLink
            to={''}
          >  沸点</NavLink>
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


export default withRouter(UserMainContentTrackStarPinSelf);