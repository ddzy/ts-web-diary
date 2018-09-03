import * as React from 'react';
import { Avatar, Divider, Icon } from 'antd';

import {
  CommentShowListItem,
  ItemTopBox,
  ItemMiddleBox,
  ItemBottomBox,
} from '../style';


export interface ICommentListItemProps {};
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
            icon="user"
            size="default"
            shape="circle"
            alt="评论者"
          />
          <Divider type="vertical" />
          <span>用户名</span>
        </ItemTopBox>

        {/* 评论内容框 */}
        <ItemMiddleBox>
          测试评论内容测试评论内容
        </ItemMiddleBox>

        {/* 评论控制栏 */}
        <ItemBottomBox>
          <Icon type="like-o" />
          <Divider type="vertical" />

          <Icon type="message" />
          <Divider type="vertical" />

          <span>10分钟前</span>
        </ItemBottomBox>

      </CommentShowListItem>
    );
  }

}


export default CommentlistItem;