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
      <CollapseHeaderTipText>
        查看详细信息
      </CollapseHeaderTipText>
    );
  }

  return (
    <ActionContainer>
      <ActionContent>
        <Row>
          <Col span={18}>
            <Collapse bordered={false}>
              <Collapse.Panel
                header={handleInitCollapseHeader()}
                key="1"
              >个人信息详情</Collapse.Panel>
            </Collapse>
          </Col>
          <Col span={6}>
            <CollapseHeaderButtonBox>
              <Button
                type="dashed"
                icon="edit"
              >编辑个人信息</Button>
            </CollapseHeaderButtonBox>
          </Col>
        </Row>
      </ActionContent>
    </ActionContainer>
  );

});


export default IUserProfileInfoIndividualAction;