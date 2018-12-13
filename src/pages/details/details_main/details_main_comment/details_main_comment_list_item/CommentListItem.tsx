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
  _id: string;            // 评论id
  whom: {                 // 评论人信息
    _id: string,
    username: string,
    useravatar: string,
  };
  article: string;        // 当前文章id
  commentValue: string;   // 评论内容
  create_time: number;    // 评论时间

  replys: any[];          // 回复信息列表

  onSend: (
    inputEl: HTMLElement,
    v: string,
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
              onSend={this.props.onSend}
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
            onSend={this.props.onSend}
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