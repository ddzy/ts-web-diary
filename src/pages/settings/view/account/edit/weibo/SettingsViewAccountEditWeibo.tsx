import * as React from 'react';
import {
  Row,
  Col,
  Icon,
} from 'antd';

import {
  WeiboWrapper,
  WeiboMain,
  WeiboMainItemTitleText,
  WeiboMainItemContentText,
  WeiboMainItemActionText,
} from './style';


export interface ISettingsViewAccountEditWeiboProps { };
export interface ISettingsViewAccountEditWeiboState { }


const SettingsViewAccountEditWeibo = React.memo((props: ISettingsViewAccountEditWeiboProps) => {
  return (
    <WeiboWrapper>
      <WeiboMain>
        <Row>
          <Col span={5}>
            <Icon
              type="weibo"
              style={{
                fontSize: 18,
                color: 'red',
              }}
            />
            <WeiboMainItemTitleText>微博</WeiboMainItemTitleText>
          </Col>
          <Col span={15}>
            <WeiboMainItemContentText />
          </Col>
          <Col span={4}>
            <WeiboMainItemActionText>绑定</WeiboMainItemActionText>
          </Col>
        </Row>
      </WeiboMain>
    </WeiboWrapper>
  );
});

export default SettingsViewAccountEditWeibo;