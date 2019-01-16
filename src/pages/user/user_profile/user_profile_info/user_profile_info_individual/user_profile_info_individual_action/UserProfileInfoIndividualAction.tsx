import * as React from 'react';
import { Collapse, Row, Col, Button, } from 'antd';

import {
  ActionContainer,
  ActionContent,
  CollapseHeaderTipText,
  CollapseHeaderButtonBox,
} from './style';


export interface IUserProfileInfoIndividualActionProps { };


const IUserProfileInfoIndividualAction = React.memo<IUserProfileInfoIndividualActionProps>((
  props: IUserProfileInfoIndividualActionProps,
): JSX.Element => {

  function handleInitCollapseHeader(): JSX.Element {
    return (
      <Row>
        <Col span={12}>
          <CollapseHeaderTipText>
            查看详细信息
          </CollapseHeaderTipText>
        </Col>
        <Col span={12}>
          <CollapseHeaderButtonBox>
            <Button
              icon="edit"
              type="ghost"
            >编辑个人信息</Button>
          </CollapseHeaderButtonBox>
        </Col>
      </Row>
    );
  }

  return (
    <ActionContainer>
      <ActionContent>
        <Collapse
          bordered={false}
        >
          <Collapse.Panel header={handleInitCollapseHeader()} key="1">
            个人信息详情
          </Collapse.Panel>
        </Collapse>
      </ActionContent>
    </ActionContainer>
  );

});


export default IUserProfileInfoIndividualAction;