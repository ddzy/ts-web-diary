import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  InfoWrapper,
  InfoMain,
} from './style';
import BasePinItemTitleInfoAvatar from './avatar/BasePinItemTitleInfoAvatar';
import BasePinItemTitleInfoProfile from './profile/BasePinItemTitleInfoProfile';


export interface IBasePinItemInfoProps { };
export interface IBasePinItemInfoState { }


const BasePinItemInfo = React.memo((props: IBasePinItemInfoProps) => {
  return (
    <InfoWrapper>
      <InfoMain>
        <Row>
          <Col span={3}>
            {/* 用户头像框区 */}
            <BasePinItemTitleInfoAvatar />
          </Col>
          <Col span={16}>
            {/* 用户信息区 */}
            <BasePinItemTitleInfoProfile />
          </Col>
        </Row>
      </InfoMain>
    </InfoWrapper>
  );
});

export default BasePinItemInfo;