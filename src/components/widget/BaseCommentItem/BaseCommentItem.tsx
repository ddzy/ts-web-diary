import * as React from 'react';
import {
  Avatar,
  Divider,
  Icon,
} from 'antd';

import {
  ItemTopBox,
  ItemMiddleBox,
  MiddleCommentText,
  MiddleCommentReplyRange,
  MiddleCommentReplyFrom,
  MiddleCommentReplyTo,
  ItemBottomBox,
  ItemBottomLikeBox,
  ItemBottomReplyBox,
  ItemReplyBox,
} from './style';
import { formatTime } from '../../../utils/utils';
import BaseCommentInput from '../BaseCommentInput/BaseCommentInput';


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
interface ICommentListItemState {
  replyInputValue: string;
  replyBoxId: string;
};


/**
 * 回复|评论展示 通用组件
 */
class BaseCommentItem extends React.PureComponent<
  ICommentListItemProps,
  ICommentListItemState
  > {

  public readonly state = {
    replyInputValue: '',
    replyBoxId: '',
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

  /**
   * 处理切换replybox
   */
  public handleToggleReplyBox: React.MouseEventHandler = (
    e: React.MouseEvent
  ): void => {
    const target: EventTarget & Element = e.currentTarget;
    const commentId = target.getAttribute('data-id') as string;

    this.setState((prevState) => {
      return {
        replyBoxId: prevState.replyBoxId ? '' : commentId,
      };
    });
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>

        {/* 用户信息框 */}
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

        {/* 内容框 */}
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

        {/* 控制栏 */}
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
            onClick={this.handleToggleReplyBox}
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
        <ItemReplyBox
          data-id={this.props._id}
          style={{
            display: this.props._id === this.state.replyBoxId
              ? 'block'
              : 'none'
          }}
        >
          <BaseCommentInput
            placeHolder={'回复 duan'}
            useravatar={this.props.whom.useravatar}
            avatarSize={'default'}
            onInputChange={this.handleReplyInputChange}
            inputValue={this.state.replyInputValue}
            onSend={this.handleSendReply}
            onEmojiChange={this.handleEmojiChange}
          />
        </ItemReplyBox>
      </React.Fragment>
    );
  }

}


export default BaseCommentItem;