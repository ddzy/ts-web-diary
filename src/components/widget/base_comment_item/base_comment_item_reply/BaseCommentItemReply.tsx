import * as React from 'react';

import {
  ReplyContainer,
} from './style';
import BaseCommentInput from '../../base_comment_input/BaseCommentInput';
import {
  ICommentListItemProps,
} from '../BaseCommentItem';


export interface IBaseCommentItemReplyProps extends ICommentListItemProps {
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