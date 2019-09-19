import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import BasePinEditActionImage from './image/BasePinEditActionImage';
import BasePinEditActionLink from './link/BasePinEditActionLink';
import BasePinEditActionTopic from './topic/BasePinEditActionTopic';


export interface IBasePinEditActionProps { };
export interface IBasePinEditActionState { }


const BasePinEditAction = React.memo((props: IBasePinEditActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={3}>
            {/* 沸点图片上传区 */}
            <BasePinEditActionImage />
          </Col>
          <Col span={3}>
            {/* 沸点链接上传区 */}
            <BasePinEditActionLink />
          </Col>
          <Col span={3}>
            {/* 沸点话题选择区 */}
            <BasePinEditActionTopic />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinEditAction;