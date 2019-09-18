import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  EditWrapper,
  EditMain,
} from './style';
import PinMainViewEditInput from './input/PinMainViewEditInput';
import PinMainViewEditAction from './action/PinMainViewEditAction';
import PinMainViewEditSend from './send/PinMainViewEditSend';


export interface IPinMainViewEditProps { };
export interface IPinMainViewEditState { }


const PinMainViewEdit = React.memo((props: IPinMainViewEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <Row>
          <Col>
            {/* 沸点文字输入区 */}
            <PinMainViewEditInput />
          </Col>
        </Row>
        <Row style={{
          marginTop: 8,
        }}>
          <Col span={20}>
            {/* 沸点附加信息区 */}
            <PinMainViewEditAction />
          </Col>
          <Col span={4}>
            {/* 沸点发送区 */}
            <PinMainViewEditSend />
          </Col>
        </Row>
      </EditMain>
    </EditWrapper>
  );
});

export default PinMainViewEdit;