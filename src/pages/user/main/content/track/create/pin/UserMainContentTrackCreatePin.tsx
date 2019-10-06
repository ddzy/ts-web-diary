import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Card,
} from 'antd';

import {
  PinWrapper,
  PinMain,
  PinMainTitleBox,
  PinMainContentBox,
  PinMainContentText,
  PinMainExtraBox,
} from './style';
import { formatTime } from 'utils/utils';
import {
  IBaseCommonTrackCreatePinInfo,
} from 'pages/user/User.types';


export interface IUserMainContentTrackCreatePinProps extends RouteComponentProps {
  // ? 发表沸点的足迹相关信息
  trackInfo: IBaseCommonTrackCreatePinInfo;
};
export interface IUserMainContentTrackCreatePinState { };


const UserMainContentTrackCreatePin = React.memo((props: IUserMainContentTrackCreatePinProps) => {
  /**
   * [初始化] - 卡片标题
   */
  function _initCardTitle() {
    return (
      <PinMainTitleBox>
        发布了沸点
      </PinMainTitleBox>
    );
  }

  /**
   * [初始化] - 卡片内容
   */
  function _initCardContent() {
    return (
      <PinMainContentBox>
        <PinMainContentText
          onClick={handleCardContentClick}
        >
          速速围观>>>
        </PinMainContentText>
      </PinMainContentBox>
    );
  }

  /**
   * [初始化] - 卡片的额外区域
   */
  function _initCardExtra() {
    return (
      <PinMainExtraBox>
        {formatTime(props.trackInfo.create_time)}
      </PinMainExtraBox>
    );
  }

  /**
   * [处理] - 当前主人发表的沸点点击, 进入该沸点的详情页
   */
  function handleCardContentClick() {
    const createPinId = props.trackInfo.pin._id;

    props.history.push(`/details/${createPinId}`);
  }

  return (
    <PinWrapper>
      <PinMain>
        <Card
          style={{
            width: '100%'
          }}
          title={_initCardTitle()}
          extra={_initCardExtra()}
        >
          {_initCardContent()}
        </Card>
      </PinMain>
    </PinWrapper>
  );
});


export default withRouter(UserMainContentTrackCreatePin);