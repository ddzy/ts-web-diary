import * as React from 'react';
import {
  Row,
  Col,
  Icon,
  Divider,
} from 'antd';

import {
  ActionContainer,
  ActionLikeIconBox,
  ActionReplyIconBox,
  ActionRightBox,
  ActionTimeIconBox,
} from './style';
import { formatTime } from 'src/utils/utils';


export interface IBaseCommentItemActionProps {
  // ** 当前主用户 回复输入框统一头像 **
  currentMainUserAvatar: string;
  // ** 评论回复判别 **
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

  // ** 自定义回复模态框样式 **
  baseInputContainerStyle?: React.CSSProperties;
  baseInputStyle?: React.CSSProperties;
  onSend: (
    inputEl: HTMLElement,
    v: any,
  ) => void;

  // ** 处理切换replyBox **
  onToggleReplyBox: (
    e: React.MouseEvent<HTMLElement>,
  ) => void;
};


const BaseCommentItemAction = React.memo<IBaseCommentItemActionProps>((
  props: IBaseCommentItemActionProps,
): JSX.Element => {
  return (
    <ActionContainer>
      <Row>
        <Col span={12}>
          <ActionTimeIconBox>
            {formatTime(props.content.create_time)}
          </ActionTimeIconBox>
        </Col>
        <Col span={12}>
          <ActionRightBox>
            <ActionLikeIconBox
              data-id={props.content._id}
            >
              <Icon type="like-o" />
              <span>999</span>
              <Divider type="vertical" />
            </ActionLikeIconBox>

            <ActionReplyIconBox
              data-id={props.content._id}
              onClick={props.onToggleReplyBox}
            >
              <Icon
                type="message"
              />
              <span>回复</span>
            </ActionReplyIconBox>
          </ActionRightBox>
        </Col>
      </Row>
    </ActionContainer>
  );
});


export default BaseCommentItemAction;