import * as React from 'react';
import {
  Statistic,
  Row,
  Col,
} from 'antd';

import {
  StatisticWrapper,
  StatisticMain,
  StatisticMainPinBox,
  StatisticMainAttentionBox,
} from './style';


export interface ITopicSingleAsideInfoStatisticProps { };
export interface ITopicSingleAsideInfoStatisticState { };


const TopicSingleAsideInfoStatistic = React.memo((props: ITopicSingleAsideInfoStatisticProps) => {
  return (
    <StatisticWrapper>
      <StatisticMain>
        <Row>
          <Col span={12}>
            <StatisticMainPinBox>
              <Statistic title="沸点" value={3005} />
            </StatisticMainPinBox>
          </Col>
          <Col span={12}>
            <StatisticMainAttentionBox>
              <Statistic title="关注" value={1882} />
            </StatisticMainAttentionBox>
          </Col>
        </Row>
      </StatisticMain>
    </StatisticWrapper>
  );
});


export default TopicSingleAsideInfoStatistic;