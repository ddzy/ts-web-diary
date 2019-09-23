import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  InfoWrapper,
  InfoMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from '../../BasePinItem.types';
import BasePinItemTitleInfoAvatar from './avatar/BasePinItemTitleInfoAvatar';
import BasePinItemTitleInfoProfile from './profile/BasePinItemTitleInfoProfile';


export interface IBasePinItemInfoProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'create_time' | 'author_id'>;
};
export interface IBasePinItemInfoState { }


const BasePinItemInfo = React.memo((props: IBasePinItemInfoProps) => {
  return (
    <InfoWrapper>
      <InfoMain>
        <Row>
          <Col span={4}>
            {/* 用户头像框区 */}
            <BasePinItemTitleInfoAvatar
              pinInfo={props.pinInfo}
            />
          </Col>
          <Col span={16}>
            {/* 用户信息区 */}
            <BasePinItemTitleInfoProfile
              pinInfo={props.pinInfo}
            />
          </Col>
        </Row>
      </InfoMain>
    </InfoWrapper>
  );
});

export default BasePinItemInfo;