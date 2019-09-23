import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
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
import {
  ICommonBasePinItemInfo,
} from '../BasePinItem.types';


export interface IBasePinItemTopicProps extends RouteComponentProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, 'topic_id'>;
};
export interface IBasePinItemTopicState { }


const BasePinItemTopic = React.memo((props: IBasePinItemTopicProps) => {
  /**
   * [处理] - 话题标签点击
   * @description 跳转至对应的话题详情页
   */
  function handleTopicTagClick() {
    const topicId = props.pinInfo.topic_id._id;

    props.history.push(`/topic/${topicId}`);
  }

  return (
    <TopicWrapper>
      <TopicMain>
        <Row gutter={40}>
          <Col span={1} />
          <Col span={21}>
            <TopicMainList>
              <TopicMainItem>
                <TopicMainItemTag
                  onClick={handleTopicTagClick}
                >
                  {props.pinInfo.topic_id.name}
                </TopicMainItemTag>
              </TopicMainItem>
            </TopicMainList>
          </Col>
        </Row>
      </TopicMain>
    </TopicWrapper>
  );
});

export default withRouter(BasePinItemTopic);