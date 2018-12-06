import * as React from 'react';

import {
  CommentShowListItem,
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

  // !!! 重构 !!!
  inputValue: string;
  onInputChange: (e: React.ChangeEvent) => void;
  onSend: () => void;
  onEmojiChange: (e: React.MouseEvent) => void;
};
interface ICommentListItemState {};


/**
 * 单个评论项
 */
class CommentListItem extends React.PureComponent<
  ICommentListItemProps,
  ICommentListItemState
  > {
  public render(): JSX.Element {
    const content = this.props;
    return (
      <CommentShowListItem>
        {/* 评论展示 */}
        <BaseCommentItem
          isReply={false}
          content={content}
          {...this.props}
          inputValue={this.props.inputValue}
          onInputChange={this.props.onInputChange}
          onSend={this.props.onSend}
          onEmojiChange={this.props.onEmojiChange}
        />
        {/* 回复展示 */}
        <div style={{ width: '100%', height: '100%', padding: '0 3rem' }}>
          <div style={{backgroundColor: '#fafbfc', padding: '1rem'}}>
            <BaseCommentItem
              isReply={true}
              content={content}
              {...this.props}
              inputValue={this.props.inputValue}
              onInputChange={this.props.onInputChange}
              onSend={this.props.onSend}
              onEmojiChange={this.props.onEmojiChange}
            />
          </div>
        </div>
      </CommentShowListItem>
    );
  }

}


export default CommentListItem;