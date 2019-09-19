import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import BasePinItemTitleActionAttention from './attention/BasePinItemTitleActionAttention';
import BasePinItemTitleActionFriend from './friend/BasePinItemTitleActionFriend';
import BasePinItemTitleActionExtra from './extra/BasePinItemTitleActionExtra';


export interface IBasePinItemTitleActionProps { };
export interface IBasePinItemTitleActionState { }


const BasePinItemTitleAction = React.memo((props: IBasePinItemTitleActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={8}>
            {/* 关注区 */}
            <BasePinItemTitleActionAttention />
          </Col>
          <Col span={8}>
            {/* 好友区 */}
            <BasePinItemTitleActionFriend />
          </Col>
          <Col span={6}>
            {/* 附加区 */}
            <BasePinItemTitleActionExtra />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinItemTitleAction;