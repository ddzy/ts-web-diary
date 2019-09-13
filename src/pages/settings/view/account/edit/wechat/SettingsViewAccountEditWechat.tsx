import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  WechatWrapper,
  WechatMain,
  WechatMainItemTitleText,
  WechatMainItemContentText,
  WechatMainItemActionText,
} from './style';


export interface ISettingsViewAccountEditWechatProps { };
export interface ISettingsViewAccountEditWechatState { }


const SettingsViewAccountEditWechat = React.memo((props: ISettingsViewAccountEditWechatProps) => {
  return (
    <WechatWrapper>
      <WechatMain>
        <Row>
          <Col span={5}>
            <Icon
              theme="filled"
              type="wechat"
              style={{
                fontSize: 18,
                color: '#1da57a',
              }}
            />
            <WechatMainItemTitleText>微信</WechatMainItemTitleText>
          </Col>
          <Col span={15}>
            <WechatMainItemContentText>bb老猫</WechatMainItemContentText>
          </Col>
          <Col span={4}>
            <WechatMainItemActionText>解除绑定</WechatMainItemActionText>
          </Col>
        </Row>
      </WechatMain>
    </WechatWrapper>
  );
});

export default SettingsViewAccountEditWechat;