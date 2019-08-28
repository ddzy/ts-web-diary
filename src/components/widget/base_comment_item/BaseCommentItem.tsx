import * as React from 'react';

import BaseCommentItemTitle from './title/BaseCommentItemTitle';
import BaseCommentItemContent from './content/BaseCommentItemContent';
import BaseCommentItemAction from './action/BaseCommentItemAction';
import BaseCommentItemReply from './reply/BaseCommentItemReply';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseArticleCommentReplyInfo,
} from 'pages/details/Details.types';


export interface ICommentListItemProps {
  // ? 当前主用户 回复输入框统一头像
  currentMainUserAvatar: string;

  // ? 评论回复判别
  isReply: boolean;
  // ? 单个评论或回复的详细信息
  commentInfo: ICommonBaseArticleCommentReplyInfo | ICommonBaseArticleCommentInfo;

  // ? 自定义回复模态框样式
  baseInputContainerStyle?: React.CSSProperties;
  baseInputStyle?: React.CSSProperties;

  onSend: (
    inputEl: HTMLElement,
    v: any,
  ) => void;
};
interface ICommentListItemState {
  replyBoxId: string;
  replyBtn: HTMLElement,

  showReplyBox: boolean;
};


/**
 * 回复|评论展示 通用组件
 */
export const BaseCommentItem = React.memo<ICommentListItemProps>((
  props: ICommentListItemProps,
): JSX.Element => {

  const [
    state,
    setState,
  ] = React.useState<ICommentListItemState>({
    replyBoxId: '',
    replyBtn: document.createElement('div'),
    showReplyBox: false,
  });

  React.useEffect(() => {
    state.replyBtn.classList.toggle(
      'comment-action-reply-btn-active',
      state.showReplyBox,
    );
  }, [state]);

  function handleSend(
    e: HTMLElement,
    v: string,
  ): void {
    props.onSend(
      e,
      {
        from: localStorage.getItem('userid'),
        to: props.commentInfo.from._id,
        value: v,
      },
    );
  }

  /**
   * 处理切换回复模态框
   */
  function handleToggleReplyBox (
    e: React.MouseEvent<HTMLElement>,
  ): void {
    const oTarget = e.currentTarget;
    const oTargetId = oTarget.getAttribute('data-id');
    const commentId = props.commentInfo._id;

    setState({
      showReplyBox: (oTargetId === commentId) && (!state.showReplyBox),
      replyBoxId: commentId,
      replyBtn: oTarget,
    });
  }

  return (
    <React.Fragment>
      {/* 用户信息框 */}
      <BaseCommentItemTitle
        {...props}
      />

      {/* 内容框 */}
      <BaseCommentItemContent
        {...props}
      />

      {/* 控制栏 */}
      <BaseCommentItemAction
        {...props}
        onToggleReplyBox={handleToggleReplyBox}
      />

      {/* 评论输入通用组件 */}
      {
        state.showReplyBox && (
          <BaseCommentItemReply
            {...props}
            {...state}
            onSend={handleSend}
          />
        )
      }
    </React.Fragment>
  );
});