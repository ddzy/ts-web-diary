import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from '../../BasePinItem.types';
import BasePinItemTitleActionAttention from './attention/BasePinItemTitleActionAttention';
import BasePinItemTitleActionFriend from './friend/BasePinItemTitleActionFriend';
import BasePinItemTitleActionExtra from './extra/BasePinItemTitleActionExtra';


export interface IBasePinItemTitleActionProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'user_is_attention' | 'user_is_current_author' | 'user_is_friend'>;
};
export interface IBasePinItemTitleActionState { }


const BasePinItemTitleAction = React.memo((props: IBasePinItemTitleActionProps) => {
  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={8}>
            {/* 关注区 */}
            <BasePinItemTitleActionAttention
              pinInfo={props.pinInfo}
            />
          </Col>
          <Col span={8}>
            {/* 好友区 */}
            <BasePinItemTitleActionFriend
              pinInfo={props.pinInfo}
            />
          </Col>
          <Col span={6}>
            {/* 附加区 */}
            <BasePinItemTitleActionExtra />
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );
});

export default BasePinItemTitleAction;