import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  IndividualContainer,
  IndividualContent,
} from './style';
import UserProfileInfoIndividualTitle from './user_profile_info_individual_title/UserProfileInfoIndividualTitle';
import UserProfileInfoIndividualAction from './user_profile_info_individual_action/UserProfileInfoIndividualAction';


export interface IUserProfileInfoIndividualProps { };


const UserProfileInfoIndividual = React.memo<IUserProfileInfoIndividualProps>((
  props: IUserProfileInfoIndividualProps,
): JSX.Element => {

  return (
    <IndividualContainer>
      <IndividualContent>
        <Row>
          <Col>
            <UserProfileInfoIndividualTitle />
          </Col>
        </Row>
        <Row>
          <Col>
            <UserProfileInfoIndividualAction />
          </Col>
        </Row>
      </IndividualContent>
    </IndividualContainer>
  );

});


export default UserProfileInfoIndividual;