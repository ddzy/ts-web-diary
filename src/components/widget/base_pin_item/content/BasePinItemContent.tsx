import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainTextBox,
  ContentMainText,
} from './style';


export interface IBasePinItemContentProps { };
export interface IBasePinItemContentState { }


const BasePinItemContent = React.memo((props: IBasePinItemContentProps) => {
  return (
    <ContentWrapper>
      <ContentMain>
        <Row gutter={40}>
          <Col span={1} />
          <Col span={21}>
            <ContentMainTextBox>
              <ContentMainText>
                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容

                <br />
                <br />

                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容

                <br />
                <br />

                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容

                <br />
                <br />

                沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容沸点内容
              </ContentMainText>
            </ContentMainTextBox>
          </Col>
        </Row>
      </ContentMain>
    </ContentWrapper>
  );
});

export default BasePinItemContent;