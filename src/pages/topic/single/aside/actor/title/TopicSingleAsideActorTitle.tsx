import * as React from 'react';
import {
  Row,
  Col,
  Button,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
  TitleMainTipBox,
  TitleMainTip,
  TitleMainLinkBox,
} from './style';
import { IStaticTopicInfo } from 'pages/topic/Topic.types';


export interface ITopicSingleAsideActorTitleProps {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };
};
export interface ITopicSingleAsideActorTitleState { };


const TopicSingleAsideActorTitle = React.memo((props: ITopicSingleAsideActorTitleProps) => {
  return (
    <TitleWrapper>
      <TitleMain>
        <Row>
          <Col span={16}>
            {/* 左侧提示区 */}
            <TitleMainTipBox>
              <TitleMainTip>
                共有 {props.topicInfo.actors.length} 人参加
              </TitleMainTip>
            </TitleMainTipBox>
          </Col>
          <Col span={8}>
            {/* 右侧链接区 */}
            <TitleMainLinkBox>
              <Button
                type="link"
              >全部 ></Button>
            </TitleMainLinkBox>
          </Col>
        </Row>
      </TitleMain>
    </TitleWrapper>
  );
});


export default TopicSingleAsideActorTitle;