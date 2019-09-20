import * as React from 'react';
import {
  Row,
  Col,
  Affix,
} from 'antd';

import {
  MainWrapper,
  MainContent,
} from './style';
import PinMainNav from './nav/PinMainNav';
import PinMainView from './view/PinMainView';
import PinMainExtra from './extra/PinMainExtra';


export interface IPinMainProps { };
export interface IPinMainState { }


const PinMain = React.memo((props: IPinMainProps) => {
  return (
    <MainWrapper>
      <MainContent>
        <Row gutter={20}>
          <Col span={3}>
            {/* 导航区块 */}
            {/* <PinMainNav /> */}
            <Affix offsetTop={80}>
              <PinMainNav />
            </Affix>
          </Col>
          <Col span={15}>
            {/* 视图区块 */}
            <PinMainView />
          </Col>
          <Col span={6}>
            {/* 附加区块 */}
            {/* <PinMainExtra /> */}
            <Affix offsetTop={80}>
              <PinMainExtra />
            </Affix>
          </Col>
        </Row>
      </MainContent>
    </MainWrapper>
  );
});

export default PinMain;