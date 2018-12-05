import * as React from 'react';

import {
  CommentShowListItem,
} from '../style';
import BaseCommentItem from 'src/components/widget/BaseCommentItem/BaseCommentItem';

export interface ICommentListItemProps {
  isReply: boolean;       // 是否为回复内容

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
    return (
      <CommentShowListItem>
        {/* 通用评论展示组件 */}
        <BaseCommentItem
          {...this.props}
        />
        {/* 回复框 */}
        <div style={{ width: '100%', height: '100%', }}>
          hahahha
        </div>
      </CommentShowListItem>
    );
  }

}


export default CommentListItem;