import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  PhoneWrapper,
  PhoneMain,
  PhoneMainItemTitleText,
  PhoneMainItemContentText,
  PhoneMainItemActionText,
} from './style';


export interface ISettingsViewAccountEditPhoneProps { };
export interface ISettingsViewAccountEditPhoneState { }


const SettingsViewAccountEditPhone = React.memo((props: ISettingsViewAccountEditPhoneProps) => {
  return (
    <PhoneWrapper>
      <PhoneMain>
        <Row>
          <Col span={5}>
            <Icon
              theme="filled"
              type="phone"
              style={{
                fontSize: 18,
                color: '#1890ff',
              }}
            />
            <PhoneMainItemTitleText>手机</PhoneMainItemTitleText>
          </Col>
          <Col span={15}>
            <PhoneMainItemContentText>13129156309</PhoneMainItemContentText>
          </Col>
          <Col span={4}>
            <PhoneMainItemActionText>解除绑定</PhoneMainItemActionText>
          </Col>
        </Row>
      </PhoneMain>
    </PhoneWrapper>
  );
});

export default SettingsViewAccountEditPhone;