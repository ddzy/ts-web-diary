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

  // !!! 重构 !!!
  content: {
    _id: string;            // 评论|回复id
    whom: {                 // 评论|回复人信息
      _id: string,
      username: string,
      useravatar: string,
    };
    article: string;        // 当前文章id
    create_time: number;    // 评论时间

    // !! 重构 distinguish comment&reply
    from?: {
      _id: string,
      username: string,
      useravatar: string,
    };
    to?: {
      _id: string,
      username: string,
      useravatar: string,
    };
    commentValue?: string;   // 评论内容
    replyValue?: string;
    children?: any;
    comment?: string;       
    star?: number;
  },
  inputValue: string;
  onInputChange: (e: React.ChangeEvent) => void;
  onSend: () => void;
  onEmojiChange: (e: React.MouseEvent) => void;
};
interface ICommentListItemState {
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
    replyBoxId: '',
  }

  /**
   * 处理切换replybox
   */
  public handleToggleReplyBox: React.MouseEventHandler = (
    e: React.MouseEvent
  ): void => {
    const target: EventTarget & Element = e.currentTarget;
    const commentId = target.getAttribute('data-id') as string;

    // 关闭其他的 回复框replyBox
    const oItemReplyBoxArr = document
      .querySelectorAll('.item-reply-box') as NodeListOf<HTMLDivElement>;
    oItemReplyBoxArr.forEach((element) => {
      const id = element.getAttribute('data-id') as string;
      const sId = this.state.replyBoxId;
      if (id !== sId) {
        element.style.display = 'none';
      }
    });

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
            src={this.props.content.whom.useravatar}
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
          >{this.props.content.whom.username}</span>
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
              __html: this.props.content.commentValue || this.props.content.replyValue || '',
            }}
          />
        </ItemMiddleBox>

        {/* 控制栏 */}
        <ItemBottomBox>
          <ItemBottomLikeBox
            data-id={this.props.content._id}
          >
            <Icon type="like-o" />
            <span>999</span>
            <Divider type="vertical" />
          </ItemBottomLikeBox>

          <ItemBottomReplyBox
            data-id={this.props.content._id}
            onClick={this.handleToggleReplyBox}
          >
            <Icon
              type="message"
            />
            <span>回复</span>
            <Divider type="vertical" />
          </ItemBottomReplyBox>

          <span>{formatTime(this.props.content.create_time)}</span>
        </ItemBottomBox>

        {/* 评论输入通用组件 */}
        <ItemReplyBox
          className="item-reply-box"
          data-id={this.props.content._id}
          style={{
            display: this.props.content._id === this.state.replyBoxId
              ? 'block'
              : 'none'
          }}
        >
          <BaseCommentInput
            placeHolder={'回复 duan'}
            useravatar={this.props.content.whom.useravatar}
            avatarSize={'default'}
            onInputChange={this.props.onInputChange}
            inputValue={this.props.inputValue}
            onSend={this.props.onSend}
            onEmojiChange={this.props.onEmojiChange}
          />
        </ItemReplyBox>
      </React.Fragment>
    );
  }

}


export default BaseCommentItem;