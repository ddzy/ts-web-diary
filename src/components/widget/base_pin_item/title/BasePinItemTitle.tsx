import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
} from './style';
import BasePinItemTitleInfo from './info/BasePinItemTitleInfo';
import BasePinItemAction from './action/BasePinItemTitleAction';
import { ICommonBasePinItemInfo } from '../BasePinItem.types';


export interface IBasePinItemTitleProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'create_time' | 'author_id' | 'user_is_attention' | 'user_is_current_author' | 'user_is_friend'>;
};
export interface IBasePinItemTitleState { }


const BasePinItemTitle = React.memo((props: IBasePinItemTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <Row>
          <Col span={12}>
            {/* 用户信息区 */}
            <BasePinItemTitleInfo
              pinInfo={props.pinInfo}
            />
          </Col>
          <Col span={12}>
            {/* 附加动作区 */}
            <BasePinItemAction
              pinInfo={props.pinInfo}
            />
          </Col>
        </Row>
      </TitleMain>
    </TitleWrapper>
  );
});

export default BasePinItemTitle;