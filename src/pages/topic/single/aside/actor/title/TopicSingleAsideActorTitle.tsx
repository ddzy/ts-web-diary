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


export interface ITopicSingleAsideActorTitleProps { };
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
                共有 7852 人参加
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