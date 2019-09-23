import * as React from 'react';
import {
  connect, ConnectOptions,
} from 'react-redux';
import {
  message,
  notification,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  CommentWrapper,
  CommentMain,
} from './style';
import {
  ICommonBasePinItemInfo,
  ICommonBasePinCommentInfo,
} from '../../BasePinItem.types';
import { query } from 'services/request';
import {
  PIN_COMMENT_PAGE_SIZE_SMALL,
  PIN_REPLY_PAGE_SIZE_SMALL,
} from 'constants/constants';
import BasePinItemActionCommentEdit from './edit/BasePinItemActionCommentEdit';
import BasePinItemActionCommentShow from './show/BasePinItemActionCommentShow';


export interface IBasePinItemActionCommentProps extends RouteComponentProps, ConnectOptions {
  // ? 当前登录的用户信息
  AuthRouteReducer: {
    useravatar: string,
  };
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, '_id'>;
};
export interface IBasePinItemActionCommentState {
  // ? 沸点评论列表
  commentList: ICommonBasePinCommentInfo[];
  // ? 分页相关: 是否还有更多评论
  hasMoreComment: boolean;
}


const BasePinItemActionComment = React.memo((props: IBasePinItemActionCommentProps) => {
  const [state, setState] = React.useState<IBasePinItemActionCommentState>({
    commentList: [],
    hasMoreComment: true,
  });

  React.useEffect(() => {
    _getCommentListFromServer('');
  }, []);


  /**
   * [获取] - 沸点评论列表
   */
  function _getCommentListFromServer(
    lastCommentId: string,
  ) {
    const pinId = props.pinInfo._id;
    const commentPageSize = PIN_COMMENT_PAGE_SIZE_SMALL;
    const replyPageSize = PIN_REPLY_PAGE_SIZE_SMALL;

    query({
      method: 'POST',
      url: '/api/pin/comment/info/list',
      jsonp: false,
      data: {
        pinId,
        lastCommentId,
        commentPageSize,
        replyPageSize,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const commentList = resData.commentList;
        const newCommentList = !lastCommentId
          ? commentList
          : state.commentList.concat(commentList);

        setState({
          ...state,
          commentList: newCommentList,
          hasMoreComment: newCommentList.length !== 0,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 发送沸点评论
   * @param el 输入框DOM
   * @param plainContent 普通文本内容
   * @param imageContent 图片内容
   */
  function handleSendComment(
    el: HTMLElement,
    plainContent: string,
    imageContent: string[],
  ) {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户鉴权信息失效, 请重新登录!',
      });

      return props.history.push('/login');
    }

    // 评论内容过滤
    if (!plainContent) {
      return message.info('评论内容不能为空!');
    }

    const pinId = props.pinInfo._id;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/pin/comment/create',
      data: {
        fromUserId: userId,
        pinId,
        plainContent,
        imageContent,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const commentInfo = resData.commentInfo;

        setState({
          ...state,
          commentList: [
            commentInfo,
            ...state.commentList,
          ],
        });

        message.success('评论发送成功!');
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 发送沸点回复
   * @param inputEl 输入框DOM
   * @param data 回复的相关信息
   */
  function handleSendReply(
    inputEl: HTMLElement,
    data: {
      commentId: string,
      to: string,
      plainContent: string,
      imageContent: string[],
    },
  ) {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户鉴权信息失效, 请重新登录!',
      });

      return props.history.push('/login');
    }

    // 回复内容过滤
    if (!data.plainContent) {
      return message.info('回复内容不能为空!');
    }

    query({
      method: 'POST',
      url: '/api/pin/reply/create',
      jsonp: false,
      data: {
        ...data,
        fromUserId: userId,
        toUserId: data.to,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const replyInfo = resData.replyInfo;
        const newCommentList = state.commentList.map((comment) => {
          if (comment._id === replyInfo.comment_id) {
            return {
              ...comment,
              replys: [
                replyInfo,
                ...comment.replys,
              ],
            };
          }

          return comment;
        });

        setState({
          ...state,
          commentList: newCommentList,
        });

        message.success('回复发表成功!');
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 评论加载更多
   * @param lastCommentId 截断点
   * @param callback 回调函数
   */
  function handleLoadMoreComment(
    lastCommentId: string,
    callback?: () => void,
  ) {
    _getCommentListFromServer(lastCommentId);

    callback && callback();
  }

  /**
   * [处理] - 回复加载更多
   * @param commentId 评论id
   * @param lastReplyId 回复截断点
   * @param callback 回调处理器
   */
  function handleLoadMoreReply(
    commentId: string,
    lastReplyId: string,
    callback?: () => void,
  ) {
    const pinId = props.pinInfo._id;
    const replyPageSize = PIN_REPLY_PAGE_SIZE_SMALL;

    query({
      method: 'POST',
      url: '/api/pin/reply/info/list',
      jsonp: false,
      data: {
        pinId,
        commentId,
        lastReplyId,
        replyPageSize,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const replyList = resData.replyList;
        const newCommentList = state.commentList.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replys: comment.replys.concat(replyList),
            };
          }
          return comment;
        });

        setState({
          ...state,
          commentList: newCommentList,
        });
      } else {
        message.error(resMessage);
      }

      callback && callback();
    });
  }

  return (
    <CommentWrapper>
      <CommentMain>
        {/* 沸点评论输入区 */}
        <BasePinItemActionCommentEdit
          currentMainUserAvatar={props.AuthRouteReducer.useravatar}
          onSend={handleSendComment}
        />

        {/* 沸点评论展示区 */}
        <BasePinItemActionCommentShow
          currentMainUserAvatar={props.AuthRouteReducer.useravatar}
          hasMoreComment={state.hasMoreComment}
          commentList={state.commentList}
          onSendReply={handleSendReply}
          onLoadMoreComment={handleLoadMoreComment}
          onLoadMoreReply={handleLoadMoreReply}
        />
      </CommentMain>
    </CommentWrapper>
  );
});


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}

export default withRouter(connect(
  mapStateToProps,
)(BasePinItemActionComment));