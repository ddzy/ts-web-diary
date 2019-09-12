import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  EditWrapper,
  EditMain,
  EditMainList,
  EditMainItem,
  EditMainItemTitleText,
  EditMainItemContentText,
  EditMainItemActionText,
} from './style';


export interface ISettingsViewAccountEditProps { };
export interface ISettingsViewAccountEditState { }


const SettingsViewAccountEdit = React.memo((props: ISettingsViewAccountEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <EditMainList>
          <EditMainItem>
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
                <EditMainItemTitleText>微信</EditMainItemTitleText>
              </Col>
              <Col span={15}>
                <EditMainItemContentText>bb老猫</EditMainItemContentText>
              </Col>
              <Col span={4}>
                <EditMainItemActionText>解除绑定</EditMainItemActionText>
              </Col>
            </Row>
          </EditMainItem>

          <EditMainItem>
            <Row>
              <Col span={5}>
                <Icon
                  type="weibo"
                  style={{
                    fontSize: 18,
                    color: 'red',
                  }}
                />
                <EditMainItemTitleText>微博</EditMainItemTitleText>
              </Col>
              <Col span={15}>
                <EditMainItemContentText />
              </Col>
              <Col span={4}>
                <EditMainItemActionText>绑定</EditMainItemActionText>
              </Col>
            </Row>
          </EditMainItem>

          <EditMainItem>
            <Row>
              <Col span={5}>
                <Icon
                  theme="filled"
                  type="github"
                  style={{
                    fontSize: 18,
                  }}
                />
                <EditMainItemTitleText>GitHub</EditMainItemTitleText>
              </Col>
              <Col span={15}>
                <EditMainItemContentText>ddzy</EditMainItemContentText>
              </Col>
              <Col span={4}>
                <EditMainItemActionText>解除绑定</EditMainItemActionText>
              </Col>
            </Row>
          </EditMainItem>

          <EditMainItem>
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
                <EditMainItemTitleText>邮箱</EditMainItemTitleText>
              </Col>
              <Col span={15}>
                <EditMainItemContentText>1766083035@qq.com</EditMainItemContentText>
              </Col>
              <Col span={4}>
                <EditMainItemActionText>解除绑定</EditMainItemActionText>
              </Col>
            </Row>
          </EditMainItem>

          <EditMainItem>
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
                <EditMainItemTitleText>手机</EditMainItemTitleText>
              </Col>
              <Col span={15}>
                <EditMainItemContentText>13129156309</EditMainItemContentText>
              </Col>
              <Col span={4}>
                <EditMainItemActionText>解除绑定</EditMainItemActionText>
              </Col>
            </Row>
          </EditMainItem>
        </EditMainList>
      </EditMain>
    </EditWrapper>
  );
});

export default SettingsViewAccountEdit;