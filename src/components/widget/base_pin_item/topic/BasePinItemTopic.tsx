import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  TopicWrapper,
  TopicMain,
  TopicMainList,
  TopicMainItem,
  TopicMainItemTag,
} from './style';


export interface IBasePinItemTopicProps { };
export interface IBasePinItemTopicState { }


const BasePinItemTopic = React.memo((props: IBasePinItemTopicProps) => {
  /**
   * [初始化] - 话题标签列表
   */
  function _initTopicList() {
    const topicList = [
      {
        url: '/topic/1',
        name: '优秀开源推荐',
      },
      {
        url: '/topic/2',
        name: '你怎么看?',
      },
      {
        url: '/topic/1',
        name: 'New 咨询',
      },

    ];

    return topicList.map((v, i) => {
      return (
        <TopicMainItem key={i}>
          <TopicMainItemTag>
            {v.name}
          </TopicMainItemTag>
        </TopicMainItem>
      );
    });
  }

  return (
    <TopicWrapper>
      <TopicMain>
        <Row gutter={40}>
          <Col span={1} />
          <Col span={21}>
            <TopicMainList>
              {_initTopicList()}
            </TopicMainList>
          </Col>
        </Row>
      </TopicMain>
    </TopicWrapper>
  );
});

export default BasePinItemTopic;