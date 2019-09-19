import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  EditWrapper,
  EditMain,
} from './style';
import BasePinEditInput from './input/BasePinEditInput';
import BasePinEditAction from './action/BasePinEditAction';
import BasePinEditSend from './send/BasePinEditSend';


export interface IBasePinEditProps { };
export interface IBasePinEditState { }


const BasePinEdit = React.memo((props: IBasePinEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <Row>
          <Col>
            {/* 沸点文字输入区 */}
            <BasePinEditInput />
          </Col>
        </Row>
        <Row style={{
          marginTop: 8,
        }}>
          <Col span={20}>
            {/* 沸点附加信息区 */}
            <BasePinEditAction />
          </Col>
          <Col span={4}>
            {/* 沸点发送区 */}
            <BasePinEditSend />
          </Col>
        </Row>
      </EditMain>
    </EditWrapper>
  );
});

export default BasePinEdit;