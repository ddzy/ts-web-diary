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

  // ! 自定义回复模态框样式
  baseInputContainerStyle?: React.CSSProperties;
  baseInputStyle?: React.CSSProperties;
  onSend: (v: string) => void;
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

  // !!! 重构
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
          placeHolder={'回复 duan'}
          useravatar={this.props.content.whom.useravatar}
          avatarSize={'default'}
          onSend={this.props.onSend}
        />
      </ItemReplyBox>
    );

    // 点击active样式


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