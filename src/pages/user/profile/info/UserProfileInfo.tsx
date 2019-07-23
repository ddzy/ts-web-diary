import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  InfoWrapper,
  InfoContent,
} from './style';
import UserProfileInfoAvatar from './avatar/UserProfileInfoAvatar';
import UserProfileInfoIndividual from './individual/UserProfileInfoIndividual';


export interface IUserProfileInfoProps { };


const UserProfileInfo = React.memo<IUserProfileInfoProps>((
  props: IUserProfileInfoProps,
): JSX.Element => {

  return (
    <InfoWrapper>
      <InfoContent>
        <Row>
          <Col span={6}>
            <UserProfileInfoAvatar />
          </Col>
          <Col span={18}>
            <UserProfileInfoIndividual />
          </Col>
        </Row>
      </InfoContent>
    </InfoWrapper>
  );

});


export default UserProfileInfo;