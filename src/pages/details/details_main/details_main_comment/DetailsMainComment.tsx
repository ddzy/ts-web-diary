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
interface IDetailMainCommentState {};


/**
 * 评论区域
 */
class DetailsMainComment extends React.PureComponent<
IDetailsMainCommentProps,
IDetailMainCommentState
  > {

  public readonly state = {}

  public render(): JSX.Element {
    return (
      <LeftCommentContainer
        id="left-comment-container"
      >
        {/* 根评论输入框 */}
        <DetailsMainCommentTitle
          useravatar={this.props.useravatar}
          onSendComment={this.props.onSendComment}
        />

        {/* 根评论展示栏 */}
        <DetailsMainCommentShow
          comments={this.props.comments}
          useravatar={this.props.useravatar}
          onSendReply={this.props.onSendReply}
        />
      </LeftCommentContainer>
    );
  }
}


export default DetailsMainComment;