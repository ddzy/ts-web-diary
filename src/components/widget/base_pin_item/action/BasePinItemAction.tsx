import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Row,
  Col,
  Icon,
  notification,
  message,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
  ActionMainControlBox,
  ActionMainControlStarBox,
  ActionMainControlStar,
  ActionMainControlStarCount,
  ActionMainControlCommentBox,
  ActionMainControlComment,
  ActionMainControlCommentCount,
  ActionMainControlShareBox,
  ActionMainControlShare,
} from './style';
import {
  ICommonBasePinItemInfo,
} from '../BasePinItem.types';
import {
  TRACK_TYPE,
  NOTIFICATION_TYPE,
} from 'constants/constants';
import { query } from 'services/request';
import {
  notificationUserStarPinIOClient,
} from 'services/websocket';
import BasePinItemActionComment from './comment/BasePinItemActionComment';


export interface IBasePinItemActionProps extends RouteComponentProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, '_id' | 'comment_total' | 'author_id' | 'stared_user' | 'user_is_stared'>;
};
export interface IBasePinItemActionState {
  // ? 用户点赞沸点的socket
  notificationUserStarPinIOClient: SocketIOClient.Socket;

  // ? 是否显示评论区
  isShowCommentBox: boolean;
  // ? 当前沸点下评论 + 回复的总数
  commentAndReplyTotal: number;
  // ? 当前沸点的获赞总数
  starTotal: number;
  // ? 是否点赞
  isStar: boolean;
}


const BasePinItemAction = React.memo((props: IBasePinItemActionProps) => {

  const [state, setState] = React.useState<IBasePinItemActionState>({
    notificationUserStarPinIOClient,
    isShowCommentBox: false,
    commentAndReplyTotal: 0,
    starTotal: 0,
    isStar: false,
  });

  React.useEffect(() => {
    handleSetCommentTotal({
      type: 'replace',
      payload: props.pinInfo.comment_total,
    });
    handleSetStar();
  }, [props.pinInfo]);


  /**
   * [处理] - 评论按钮点击
   * @description 切换评论区的显隐状态
   * @param e 评论按钮的DOM元素
   */
  function handleCommentBoxClick(
    e: React.MouseEvent,
  ) {
    setState({
      ...state,
      isShowCommentBox: !state.isShowCommentBox,
    });
  }

  /**
   * [处理] - 动态更新当前沸点的评论数量
   * @param data 评论数量相关信息
   */
  function handleSetCommentTotal(
    data: {
      type: 'increase' | 'decrease' | 'replace',
      payload: number,
    },
  ) {
    switch (data.type) {
      case 'increase': {
        setState({
          ...state,
          commentAndReplyTotal: state.commentAndReplyTotal + data.payload,
        });
        break;
      }
      case 'decrease': {
        setState({
          ...state,
          commentAndReplyTotal: state.commentAndReplyTotal - data.payload,
        });
        break;
      };
      case 'replace': {
        setState({
          ...state,
          commentAndReplyTotal: data.payload,
        });
      };
      default: {
        break;
      };
    }
  }

  /**
   * [处理] - 设置初始的获赞状态
   */
  function handleSetStar() {
    setState({
      ...state,
      isStar: props.pinInfo.user_is_stared,
      starTotal: props.pinInfo.stared_user.length,
    });
  }

  /**
   * [处理] - 沸点点赞
   */
  function handlePinStar() {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '鉴权信息已丢失, 请重新登录!',
      });

      props.history.push('/login');

      return;
    }

    const pinId = props.pinInfo._id;
    const pinAuthorId = props.pinInfo.author_id._id;
    const trackType = TRACK_TYPE.star.pin.self;
    const newIsStar = !state.isStar;

    setState({
      ...state,
      isStar: newIsStar,
      starTotal: newIsStar ? state.starTotal + 1 : state.starTotal - 1,
    });

    query({
      method: 'POST',
      url: '/api/action/star/pin',
      jsonp: false,
      data: {
        userId,
        pinId,
        pinAuthorId,
        trackType,
        isStar: newIsStar,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;

      const notificationType = NOTIFICATION_TYPE.user.star.pin.self;
      const authorId = props.pinInfo.author_id._id;

      if (resCode === 0) {
        // 点赞之后, 实时通知该沸点的作者
        state.notificationUserStarPinIOClient.emit('sendUserStarPin', {
          userId,
          authorId,
          pinId,
          notificationType,
          isStar: newIsStar,
        });

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <ActionWrapper>
      <ActionMain>
        <Row gutter={40}>
          <Col span={1} />
          <Col span={21}>
            {/* 控制框 */}
            <ActionMainControlBox>
              <Row>
                <Col span={8}>
                  <ActionMainControlStarBox
                    onClick={handlePinStar}
                  >
                    <ActionMainControlStar>
                      <Icon
                        type="like"
                        theme={
                          state.isStar ? 'filled' : 'outlined'
                        }
                      />
                      {
                        state.starTotal
                          ? (
                            <ActionMainControlStarCount>
                              {state.starTotal}
                            </ActionMainControlStarCount>
                          )
                          : null
                      }
                    </ActionMainControlStar>
                  </ActionMainControlStarBox>
                </Col>
                <Col span={8}>
                  <ActionMainControlCommentBox
                    onClick={handleCommentBoxClick}
                  >
                    <ActionMainControlComment>
                      <Icon type="message" />
                      {
                        state.commentAndReplyTotal
                          ? (
                            <ActionMainControlCommentCount>
                              {state.commentAndReplyTotal}
                            </ActionMainControlCommentCount>
                          )
                          : null
                      }
                    </ActionMainControlComment>
                  </ActionMainControlCommentBox>
                </Col>
                <Col span={8}>
                  <ActionMainControlShareBox>
                    <ActionMainControlShare>
                      <Icon type="share-alt" />
                    </ActionMainControlShare>
                  </ActionMainControlShareBox>
                </Col>
              </Row>
            </ActionMainControlBox>

            {/* 评论区 */}
            {
              state.isShowCommentBox && (<BasePinItemActionComment
                pinInfo={props.pinInfo}
                onSetCommentTotal={handleSetCommentTotal}
              />)
            }
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default withRouter(BasePinItemAction);