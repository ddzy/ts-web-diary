import * as React from 'react';

import {
  ReplyContainer,
} from './style';
import BaseCommentInput from '../../base_comment_input/BaseCommentInput';
import { ICommentListItemProps } from '../BaseCommentItem';


export interface IBaseCommentItemReplyProps {
  commentInfo: Pick<ICommentListItemProps, 'currentMainUserAvatar' | 'isReply' | 'commentInfo' | 'baseInputContainerStyle' | 'baseInputStyle'>;

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
      data-id={props.commentInfo.commentInfo._id}
    >
      <BaseCommentInput
        containerStyle={props.commentInfo.baseInputContainerStyle ? props.commentInfo.baseInputContainerStyle : {}}
        inputStyle={props.commentInfo.baseInputStyle ? props.commentInfo.baseInputStyle : {}}
        placeHolder={`回复 ${
          props.commentInfo.commentInfo.fromUserInfo
            ? props.commentInfo.commentInfo.fromUserInfo.username
            : 'undefined'
          }`}
        useravatar={props.commentInfo.currentMainUserAvatar}
        avatarSize={'default'}
        onSend={props.onSend}
      />
    </ReplyContainer>
  );
});


export default BaseCommentItemReply;