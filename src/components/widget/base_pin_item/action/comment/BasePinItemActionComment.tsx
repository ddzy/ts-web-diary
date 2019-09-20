import * as React from 'react';

import {
  CommentWrapper,
  CommentMain,
} from './style';
import BasePinItemActionCommentEdit from './edit/BasePinItemActionCommentEdit';
import BasePinItemActionCommentShow from './show/BasePinItemActionCommentShow';


export interface IBasePinItemActionCommentProps { };
export interface IBasePinItemActionCommentState { }


const BasePinItemActionComment = React.memo((props: IBasePinItemActionCommentProps) => {
  return (
    <CommentWrapper>
      <CommentMain>
        {/* 沸点评论输入区 */}
        <BasePinItemActionCommentEdit />

        {/* 沸点评论展示区 */}
        <BasePinItemActionCommentShow />
      </CommentMain>
    </CommentWrapper>
  );
});

export default BasePinItemActionComment;