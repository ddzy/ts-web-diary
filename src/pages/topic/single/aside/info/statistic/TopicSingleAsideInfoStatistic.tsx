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
import { IStaticTopicInfo } from 'pages/topic/Topic.types';


export interface ITopicSingleAsideInfoStatisticProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
};
export interface ITopicSingleAsideInfoStatisticState { };


const TopicSingleAsideInfoStatistic = React.memo((props: ITopicSingleAsideInfoStatisticProps) => {
  return (
    <StatisticWrapper>
      <StatisticMain>
        <Row>
          <Col span={12}>
            <StatisticMainPinBox>
              <Statistic title="沸点" value={props.topicInfo.pins.length} />
            </StatisticMainPinBox>
          </Col>
          <Col span={12}>
            <StatisticMainAttentionBox>
              <Statistic title="关注" value={props.topicInfo.followers.length} />
            </StatisticMainAttentionBox>
          </Col>
        </Row>
      </StatisticMain>
    </StatisticWrapper>
  );
});


export default TopicSingleAsideInfoStatistic;