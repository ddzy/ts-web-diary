import * as React from 'react';

import BaseCommentItemTitle from './base_comment_item_title/BaseCommentItemTitle';
import BaseCommentItemContent from './base_comment_item_content/BaseCommentItemContent';
import BaseCommentItemAction from './base_comment_item_action/BaseCommentItemAction';
import BaseCommentItemReply from './base_comment_item_reply/BaseCommentItemReply';


export interface ICommentListItemProps {
  // ** 当前主用户 回复输入框统一头像 **
  currentMainUserAvatar: string;
  // ** 评论回复判别 **
  isReply: boolean;
  content: {
    _id: string;
    value: string;
    create_time: number;
    from: {
      _id: string,
      username: string,
      useravatar: string,
    };
    to?: {
      _id: string,
      username: string,
      useravatar: string,
    };
  },

  // ** 自定义回复模态框样式 **
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
const BaseCommentItem = React.memo<ICommentListItemProps>((
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
    state.replyBtn.style.cssText += `${
      state.showReplyBox ? 'color: #1890ff;' : 'color: #999;'
    }`;
  }, [state]);

  function handleSend(
    e: HTMLElement,
    v: string,
  ): void {
    props.onSend(
      e,
      {
        from: localStorage.getItem('userid'),
        to: props.content.from._id,
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
    const commentId = props.content._id;

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
        {...props.content}
      />

      {/* 内容框 */}
      <BaseCommentItemContent
        isReply={props.isReply}
        {...props.content}
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


export default BaseCommentItem;