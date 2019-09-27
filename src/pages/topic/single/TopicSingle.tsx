import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  SingleWrapper,
  SingleMain,
} from './style';
import TopicSingleMain from './main/TopicSingleMain';
import TopicSingleAside from './aside/TopicSingleAside';


export interface ITopicSingleProps extends RouteComponentProps { };
export interface ITopicSingleState { };


const TopicSingle = React.memo((props: ITopicSingleProps) => {
  return (
    <SingleWrapper>
      <SingleMain>
        <Row gutter={40}>
          <Col span={16}>
            {/* 主内容区 */}
            <TopicSingleMain />
          </Col>
          <Col span={8}>
            {/* 侧边栏区 */}
            <TopicSingleAside />
          </Col>
        </Row>
      </SingleMain>
    </SingleWrapper>
  );
});


export default withRouter(TopicSingle);