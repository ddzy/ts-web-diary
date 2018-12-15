import * as React from 'react';

import {
  CommentShowListItem,
  CommentContainer,
  ReplyContainer,
  ReplyList,
  ReplyListItem,
} from './style';
import BaseCommentItem from 'src/components/widget/BaseCommentItem/BaseCommentItem';


export interface ICommentListItemProps {
  _id: string;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  },
  value: string
  create_time: number;
  replys: any[];
  star: number;

  onSend: (
    inputEl: HTMLElement,
    v: any,
  ) => void;
};
interface ICommentListItemState { };


/**
 * 单个评论项
 */
class CommentListItem extends React.PureComponent<
  ICommentListItemProps,
  ICommentListItemState
  > {

  /**
   * 处理完善回复信息 +++ commentId
   */
  public handleSendReply = (
    el: HTMLElement,
    v: any,
  ): void => {
    this.props.onSend(el, {
      ...v,
      commentId: this.props._id,
    });
  }

  /**
   * 初始化回复列表
   */
  public initReplyList = (): JSX.Element[] => {
    const { replys } = this.props;

    if (Array.isArray(replys) && replys.length !== 0) {
      return replys.map((reply, index) => {
        return (
          <ReplyListItem
            key={index}
          >
            <BaseCommentItem
              baseInputContainerStyle={{
                backgroundColor: '#fff',
              }}
              isReply={true}
              content={reply}
              {...this.props}
              onSend={this.handleSendReply}
            />
          </ReplyListItem>
        );
      });
    }
    return [];
  }

  public render(): JSX.Element {
    const content = this.props;

    return (
      <CommentShowListItem>
        {/* 评论展示 */}
        <CommentContainer>
          <BaseCommentItem
            baseInputStyle={{
              backgroundColor: '#fff',
            }}
            isReply={false}
            content={content}
            {...this.props}
            onSend={this.handleSendReply}
          />
        </CommentContainer>

        {/* 回复展示 */}
        <ReplyContainer>
          <ReplyList>
            {this.initReplyList()}
          </ReplyList>
        </ReplyContainer>
      </CommentShowListItem>
    );
  }

}


export default CommentListItem;