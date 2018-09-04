import * as React from 'react';
import { Avatar, Divider, Icon } from 'antd';

import {
  CommentShowListItem,
  ItemTopBox,
  ItemMiddleBox,
  MiddleCommentText,
  ItemBottomBox,
} from '../style';
import { formatTime } from '../../../utils/utils';


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
};
interface ICommentListItemState {};


/**
 * 评论列表 单个评论
 */
class CommentlistItem extends React.PureComponent<
  ICommentListItemProps, 
  ICommentListItemState
> {

  public readonly state = {}


  public render(): JSX.Element {
    return (
      <CommentShowListItem>

        {/* 评论用户信息框 */}
        <ItemTopBox>
          <Avatar
            src={this.props.whom.useravatar} 
            icon="user"
            size="default"
            shape="circle"
            alt="评论者"
          />
          <Divider type="vertical" />
          <span
            style={{
              color: '#999',
            }}
          >{this.props.whom.username}</span>
        </ItemTopBox>

        {/* 评论内容框 */}
        <ItemMiddleBox>
          <MiddleCommentText>
            {this.props.commentValue}
          </MiddleCommentText>
        </ItemMiddleBox>

        {/* 评论控制栏 */}
        <ItemBottomBox>
          <Icon type="like-o" />
          <Divider type="vertical" />

          <Icon type="message" />
          <Divider type="vertical" />

          <span>{formatTime(this.props.create_time)}</span>
        </ItemBottomBox>

      </CommentShowListItem>
    );
  }

}


export default CommentlistItem;