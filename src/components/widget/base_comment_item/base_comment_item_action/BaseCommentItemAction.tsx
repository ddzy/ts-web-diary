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


export interface IBaseCommentItemActionProps extends ICommentListItemProps {
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
            {formatTime(props.commentInfo.create_time)}
          </ActionTimeIconBox>
        </Col>
        <Col span={12}>
          <ActionRightBox>
            <ActionLikeIconBox
              data-id={props.commentInfo._id}
            >
              <Icon type="like-o" />
              <span>999</span>
              <Divider type="vertical" />
            </ActionLikeIconBox>

            <ActionReplyIconBox
              data-id={props.commentInfo._id}
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

      <GlobalStyle />
    </ActionContainer>
  );
});


export default BaseCommentItemAction;