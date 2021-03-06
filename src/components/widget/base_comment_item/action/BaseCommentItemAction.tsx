import * as React from 'react';
import {
  Row,
  Col,
  Icon,
  Divider,
} from 'antd';

import {
  GlobalStyle,
  ActionContainer,
  ActionLikeIconBox,
  ActionReplyIconBox,
  ActionRightBox,
  ActionTimeIconBox,
} from './style';
import { formatTime } from 'utils/utils';
import {
  ICommentListItemProps,
} from '../BaseCommentItem';


export interface IBaseCommentItemActionProps {
  commentInfo: Pick<ICommentListItemProps, 'commentInfo'>;
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
            {formatTime(props.commentInfo.commentInfo.createTime)}
          </ActionTimeIconBox>
        </Col>
        <Col span={12}>
          <ActionRightBox>
            <ActionLikeIconBox
              data-id={props.commentInfo.commentInfo._id}
            >
              <Icon type="like-o" />
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '4px',
                }}
              >999</span>
              <Divider type="vertical" />
            </ActionLikeIconBox>

            <ActionReplyIconBox
              data-id={props.commentInfo.commentInfo._id}
              onClick={props.onToggleReplyBox}
            >
              <Icon
                type="message"
              />
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '4px',
                }}
              >回复</span>
            </ActionReplyIconBox>
          </ActionRightBox>
        </Col>
      </Row>

      <GlobalStyle />
    </ActionContainer>
  );
});


export default BaseCommentItemAction;