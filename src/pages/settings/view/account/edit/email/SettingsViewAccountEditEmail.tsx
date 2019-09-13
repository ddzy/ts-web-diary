import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  EmailWrapper,
  EmailMain,
  EmailMainItemTitleText,
  EmailMainItemContentText,
  EmailMainItemActionText,
} from './style';


export interface ISettingsViewAccountEditEmailProps { };
export interface ISettingsViewAccountEditEmailState { }


const SettingsViewAccountEditEmail = React.memo((props: ISettingsViewAccountEditEmailProps) => {
  return (
    <EmailWrapper>
      <EmailMain>
        <Row>
          <Col span={5}>
            <Icon
              theme="filled"
              type="mail"
              style={{
                fontSize: 18,
                color: '#1890ff',
              }}
            />
            <EmailMainItemTitleText>邮箱</EmailMainItemTitleText>
          </Col>
          <Col span={15}>
            <EmailMainItemContentText>1766083035@qq.com</EmailMainItemContentText>
          </Col>
          <Col span={4}>
            <EmailMainItemActionText>解除绑定</EmailMainItemActionText>
          </Col>
        </Row>
      </EmailMain>
    </EmailWrapper>
  );
});

export default SettingsViewAccountEditEmail;