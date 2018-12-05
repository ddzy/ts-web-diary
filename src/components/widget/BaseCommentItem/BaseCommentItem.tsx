import * as React from 'react';
import {
  Avatar,
  Divider,
  Icon,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  CommentShowListItem,
  ItemTopBox,
  ItemMiddleBox,
  MiddleCommentText,
  MiddleCommentReplyRange,
  MiddleCommentReplyFrom,
  MiddleCommentReplyTo,
  ItemBottomBox,
  ItemBottomLikeBox,
  ItemBottomReplyBox,
} from './style';
import { formatTime } from '../../../utils/utils';
import BaseCommentInput from '../BaseCommentInput/BaseCommentInput';


export interface ICommentListItemProps extends FormComponentProps {
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
interface ICommentListItemState {
  replyInputValue: string;
};


/**
 * 评论列表 单个评论
 */
class BaseCommentItem extends React.PureComponent<
  ICommentListItemProps,
  ICommentListItemState
  > {

  public readonly state = {
    replyInputValue: '',
  }

  public handleReplyInputChange = (e: any): void => {
    console.log(e);
  } 

  public handleSendReply = () => {
    console.log('send');
  }

  public handleEmojiChange = (e: React.MouseEvent) => {
    console.log(e.target);
  }

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
          <MiddleCommentReplyRange isReply={this.props.isReply}>
            <MiddleCommentReplyFrom>
              段(作者)回复
            </MiddleCommentReplyFrom>
            <MiddleCommentReplyTo>
              <a>duan</a>:&nbsp;&nbsp;
            </MiddleCommentReplyTo>
          </MiddleCommentReplyRange>
          <MiddleCommentText
            dangerouslySetInnerHTML={{
              __html: this.props.commentValue,
            }}
          />
        </ItemMiddleBox>

        {/* 评论控制栏 */}
        <ItemBottomBox>
          <ItemBottomLikeBox
            data-id={this.props._id}
          > 
            <Icon type="like-o" />
            <span>999</span>
            <Divider type="vertical" />
          </ItemBottomLikeBox>
          
          <ItemBottomReplyBox
            data-id={this.props._id}
          >
            <Icon
              type="message"
            />
            <span>回复</span>
            <Divider type="vertical" />
          </ItemBottomReplyBox>

          <span>{formatTime(this.props.create_time)}</span>
        </ItemBottomBox>
        
        {/* 评论输入通用组件 */}
        <BaseCommentInput
          useravatar={''}
          avatarSize={'default'}
          onInputChange={this.handleReplyInputChange}
          inputValue={this.state.replyInputValue}
          onSend={this.handleSendReply}
          onEmojiChange={this.handleEmojiChange}
        />
      </CommentShowListItem>
    );
  }

}


export default BaseCommentItem;