import * as React from 'react';

import {
  ReplyContainer,
} from './style';
import BaseCommentInput from '../../base_comment_input/BaseCommentInput';


export interface IBaseCommentItemReplyProps {
  // ** 当前主用户 回复输入框统一头像 **
  currentMainUserAvatar: string;
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

  baseInputContainerStyle?: React.CSSProperties;
  baseInputStyle?: React.CSSProperties;
  onSend: (
    inputEl: HTMLElement,
    v: any,
  ) => void;
};


const BaseCommentItemReply = React.memo<IBaseCommentItemReplyProps>((
  props: IBaseCommentItemReplyProps,
): JSX.Element => {
  return (
    <ReplyContainer
      className="item-reply-box"
      data-id={props.content._id}
    >
      <BaseCommentInput
        containerStyle={props.baseInputContainerStyle ? props.baseInputContainerStyle : {}}
        inputStyle={props.baseInputStyle ? props.baseInputStyle : {}}
        placeHolder={`回复 ${
          props.content.from
            ? props.content.from.username
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