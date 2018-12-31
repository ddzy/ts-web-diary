import * as React from 'react';

import {
  LeftCommentContainer,
} from './style';
import DetailsMainCommentTitle from './details_main_comment_title/DetailsMainCommentTitle';
import DetailsMainCommentShow from './details_main_comment_show/DetailsMainCommentShow';


export interface IDetailsMainCommentProps {
  // ??? 当前用户头像 ???
  useravatar: string;

  comments: any[];

  onSendComment: (
    inputEl: HTMLElement,
    v: string,
  ) => void;
  onSendReply: (
    inputEl: HTMLElement,
    v: any,
  ) => void;
};


/**
 * 评论区域
 */
const DetailsMainComment = React.memo<IDetailsMainCommentProps>((
  props: IDetailsMainCommentProps,
): JSX.Element => {
  return (
    <LeftCommentContainer
      id="left-comment-container"
    >
      {/* 根评论输入框 */}
      <DetailsMainCommentTitle
        useravatar={props.useravatar}
        onSendComment={props.onSendComment}
      />

      {/* 根评论展示栏 */}
      <DetailsMainCommentShow
        comments={props.comments}
        useravatar={props.useravatar}
        onSendReply={props.onSendReply}
      />
    </LeftCommentContainer>
  );
});


export default DetailsMainComment;