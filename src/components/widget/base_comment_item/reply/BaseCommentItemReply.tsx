import * as React from 'react';

import {
  ReplyContainer,
} from './style';
import BaseCommentInput from '../../base_comment_input/BaseCommentInput';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseArticleCommentReplyInfo,
} from 'pages/details/Details.types';


export interface IBaseCommentItemReplyProps {
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
    plainContent: string,
    imageContent: string[],
  ) => void;
};


const BaseCommentItemReply = React.memo<IBaseCommentItemReplyProps>((
  props: IBaseCommentItemReplyProps,
): JSX.Element => {
  return (
    <ReplyContainer
      className="item-reply-box"
      data-id={props.commentInfo._id}
    >
      <BaseCommentInput
        containerStyle={props.baseInputContainerStyle ? props.baseInputContainerStyle : {}}
        inputStyle={props.baseInputStyle ? props.baseInputStyle : {}}
        placeHolder={`回复 ${
          props.commentInfo.from
            ? props.commentInfo.from.username
            : 'undefined'
          }`}
        useravatar={props.currentMainUserAvatar}
        avatarSize={'default'}
        onSend={props.onSend}
      />
    </ReplyContainer>
  );
});


export default BaseCommentItemReply;