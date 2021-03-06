import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Row,
  Col,
} from 'antd';

import {
  InterfacesWrapper,
  InterfacesMain,
} from './style';
import ChatInterfacesNav from './nav/ChatInterfacesNav';
import ChatInterfacesView from './view/ChatInterfacesView';


export interface IChatInterfacesProps extends RouteComponentProps {

};

function ChatInterfaces(props: IChatInterfacesProps) {
  return (
    <InterfacesWrapper>
      <InterfacesMain>
        <Row>
          <Col span={8}>
            <ChatInterfacesNav />
          </Col>
          <Col span={16}>
            <ChatInterfacesView />
          </Col>
        </Row>
      </InterfacesMain>
    </InterfacesWrapper>
  );
}

export default withRouter(ChatInterfaces);