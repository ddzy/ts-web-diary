import * as React from 'react';
import {
  Divider,
  Icon,
  Row,
  Col,
} from 'antd';

import {
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
import BaseCommentInput from '../base_comment_input/BaseCommentInput';
import BaseCommentItemTitle from './base_comment_item_title/BaseCommentItemTitle';


export interface ICommentListItemProps {
  // ??? 当前主用户 回复输入框统一头像 ???
  currentMainUserAvatar: string;
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
  replyBtn: HTMLElement,
};


/**
 * 回复|评论展示 通用组件
 */
const BaseCommentItem = React.memo<ICommentListItemProps>((
  props: ICommentListItemProps,
): JSX.Element => {

  const [
    state,
    setState,
  ] = React.useState<ICommentListItemState>({
    replyBoxId: '',
    replyBox: null,
    replyBtn: document.createElement('div'),
  });

  React.useEffect(() => {
    state.replyBtn.style.cssText += `${
      state.replyBox ? 'color: #1890ff;' : 'color: #999;'
    }`;
  }, [state]);

  function handleSend(
    e: HTMLElement,
    v: string,
  ): void {
    props.onSend(
      e,
      {
        from: localStorage.getItem('userid'),
        to: props.content.from._id,
        value: v,
      },
    );
  }

  /**
   * 处理切换回复模态框
   */
  function handleToggleReplyBox (
    e: React.MouseEvent<HTMLElement>,
  ): void {
    const oTarget = e.currentTarget;
    const oTargetId = oTarget.getAttribute('data-id');
    const commentId = props.content._id;
    const replyBox = (
      <ItemReplyBox
        className="item-reply-box"
        data-id={props.content._id}
      >
        <BaseCommentInput
          containerStyle={props.baseInputContainerStyle ? props.baseInputContainerStyle : {}}
          inputStyle={props.baseInputStyle ? props.baseInputStyle : {}}
          placeHolder={`回复 ${
            props.content.from
              ? props.content.from.username
              : 'undefined'
          }`}
          useravatar={props.currentMainUserAvatar}
          avatarSize={'default'}
          onSend={handleSend}
        />
      </ItemReplyBox>
    );

    oTargetId === commentId && setState({
      replyBox: state.replyBox ? '' : replyBox,
      replyBoxId: state.replyBoxId,
      replyBtn: oTarget,
    });
  }

  return (
    <React.Fragment>
      {/* 用户信息框 */}
      <BaseCommentItemTitle
        {...props.content}
      />

      {/* 内容框 */}
      <ItemMiddleBox>
        <MiddleCommentReplyRange isReply={props.isReply}>
          <MiddleCommentReplyFrom>
            回复&nbsp;
          </MiddleCommentReplyFrom>
          <MiddleCommentReplyTo>
            <a>{
              props.content.to
                ? props.content.to.username
                : 'undefined'
            }</a>:&nbsp;&nbsp;
          </MiddleCommentReplyTo>
        </MiddleCommentReplyRange>
        <MiddleCommentText
          dangerouslySetInnerHTML={{
            __html: props.content.value || props.content.value || '',
          }}
        />
      </ItemMiddleBox>

      {/* 控制栏 */}
      <ItemBottomBox>

        <Row>
          <Col span={12}>
            <ItemBottomTimeBox>
              {formatTime(props.content.create_time)}
            </ItemBottomTimeBox>
          </Col>
          <Col span={12}>
            <ItemBottonRightBox>
              <ItemBottomLikeBox
                data-id={props.content._id}
              >
                <Icon type="like-o" />
                <span>999</span>
                <Divider type="vertical" />
              </ItemBottomLikeBox>

              <ItemBottomReplyBox
                data-id={props.content._id}
                onClick={handleToggleReplyBox}
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
      {state.replyBox}
    </React.Fragment>
  );
});


export default BaseCommentItem;