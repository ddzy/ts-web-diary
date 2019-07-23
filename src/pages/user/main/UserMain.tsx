import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  MainContainer,
  MainContent,
} from './style';
import UserMainContent from './content/UserMainContent';
import UserMainExtra from './extra/UserMainExtra';


export interface IUserProfileProps { };


const UserMain = React.memo<IUserProfileProps>((
  props: IUserProfileProps,
): JSX.Element => {

  return (
    <MainContainer>
      <MainContent>
        <Row gutter={6}>
          <Col span={16}>
            <UserMainContent />
          </Col>
          <Col span={8}>
            <UserMainExtra />
          </Col>
        </Row>
      </MainContent>
    </MainContainer>
  );

});


export default UserMain;