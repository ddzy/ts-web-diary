import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import PinMainViewEditActionImage from './image/PinMainViewEditActionImage';
import PinMainViewEditActionLink from './link/PinMainViewEditActionLink';
import PinMainViewEditActionTopic from './topic/PinMainViewEditActionTopic';


export interface IPinMainViewEditActionProps { };
export interface IPinMainViewEditActionState { }


const PinMainViewEditAction = React.memo((props: IPinMainViewEditActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={3}>
            {/* 沸点图片上传区 */}
            <PinMainViewEditActionImage />
          </Col>
          <Col span={3}>
            {/* 沸点链接上传区 */}
            <PinMainViewEditActionLink />
          </Col>
          <Col span={3}>
            {/* 沸点话题选择区 */}
            <PinMainViewEditActionTopic />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default PinMainViewEditAction;