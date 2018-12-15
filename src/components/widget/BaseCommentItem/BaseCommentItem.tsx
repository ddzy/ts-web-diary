import * as React from 'react';
import {
  Avatar,
  Divider,
  Icon,
  Row,
  Col,
} from 'antd';

import {
  ItemTopBox,
  ItemMiddleBox,
  MiddleCommentText,
  MiddleCommentReplyRange,
  MiddleCommentReplyFrom,
  MiddleCommentReplyTo,
  ItemBottomBox,
  ItemBottonRightBox,
  ItemBottomLikeBox,
  ItemBottomReplyBox,
  ItemBottomTimeBox,
  ItemReplyBox,
} from './style';
import { formatTime } from '../../../utils/utils';
import BaseCommentInput from '../BaseCommentInput/BaseCommentInput';


export interface ICommentListItemProps {
  // ??? 回复 or 评论 ???
  isReply: boolean;
  content: {
    _id: string;
    value: string;
    create_time: number;
    from: {
      _id: string,
      username: string,
      useravatar: string,
    };
    to?: {
      _id: string,
      username: string,
      useravatar: string,
    };
    star: number;
  },

  // ??? 自定义回复模态框样式 ???
  baseInputContainerStyle?: React.CSSProperties;
  baseInputStyle?: React.CSSProperties;
  onSend: (
    inputEl: HTMLElement,
    v: any,
  ) => void;
};
interface ICommentListItemState {
  replyBoxId: string;
  replyBox: any;
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
    replyBox: null,
  }

  public handleSend = (
    e: HTMLElement,
    v: string,
  ): void => {
    this.props.onSend(
      e,
      {
        from: localStorage.getItem('userid'),
        to: this.props.content.from._id,
        value: v,
      },
    );
  }

  /**
   * 处理切换回复模态框
   */
  public handleToggleReplyBox: React.MouseEventHandler<HTMLElement> = (
    e: React.MouseEvent<HTMLElement>,
  ): void => {
    const oTarget = e.currentTarget;
    const oTargetId = oTarget.getAttribute('data-id');
    const commentId = this.props.content._id;
    const replyBox = (
      <ItemReplyBox
        className="item-reply-box"
        data-id={this.props.content._id}
      >
        <BaseCommentInput
          containerStyle={this.props.baseInputContainerStyle ? this.props.baseInputContainerStyle : {}}
          inputStyle={this.props.baseInputStyle ? this.props.baseInputStyle : {}}
          placeHolder={`回复 ${
            this.props.content.from
              ? this.props.content.from.username
              : 'undefined'
          }`}
          useravatar={this.props.content.from.useravatar}
          avatarSize={'default'}
          onSend={this.handleSend}
        />
      </ItemReplyBox>
    );

    oTargetId === commentId
      && this.setState((prevState) => {
        return {
          replyBox: prevState.replyBox ? '' : replyBox,
        };
      }, () => {
        oTarget.style.cssText += `${
          this.state.replyBox ? 'color: #1890ff;' : 'color: #999;'
          }`;
      });
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        {/* 用户信息框 */}
        <ItemTopBox>
          <Avatar
            src={this.props.content.from.useravatar}
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
          >{this.props.content.from.username}</span>
        </ItemTopBox>

        {/* 内容框 */}
        <ItemMiddleBox>
          <MiddleCommentReplyRange isReply={this.props.isReply}>
            <MiddleCommentReplyFrom>
              回复&nbsp;
            </MiddleCommentReplyFrom>
            <MiddleCommentReplyTo>
              <a>{
                this.props.content.to
                  ? this.props.content.to.username
                  : 'undefined'
              }</a>:&nbsp;&nbsp;
            </MiddleCommentReplyTo>
          </MiddleCommentReplyRange>
          <MiddleCommentText
            dangerouslySetInnerHTML={{
              __html: this.props.content.value || this.props.content.value || '',
            }}
          />
        </ItemMiddleBox>

        {/* 控制栏 */}
        <ItemBottomBox>

          <Row>
            <Col span={12}>
              <ItemBottomTimeBox>
                {formatTime(this.props.content.create_time)}
              </ItemBottomTimeBox>
            </Col>
            <Col span={12}>
              <ItemBottonRightBox>
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
                </ItemBottomReplyBox>
              </ItemBottonRightBox>
            </Col>
          </Row>
        </ItemBottomBox>

        {/* 评论输入通用组件 */}
        {this.state.replyBox}
      </React.Fragment>
    );
  }

}


export default BaseCommentItem;