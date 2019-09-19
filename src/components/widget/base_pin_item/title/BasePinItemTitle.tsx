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


export interface IBasePinItemTitleProps { };
export interface IBasePinItemTitleState { }


const BasePinItemTitle = React.memo((props: IBasePinItemTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <Row>
          <Col span={14}>
            {/* 用户信息区 */}
            <BasePinItemTitleInfo />
          </Col>
          <Col span={10}>
            {/* 附加动作区 */}
            <BasePinItemAction />
          </Col>
        </Row>
      </TitleMain>
    </TitleWrapper>
  );
});

export default BasePinItemTitle;