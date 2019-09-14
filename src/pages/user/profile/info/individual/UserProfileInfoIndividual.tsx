import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  IndividualContainer,
  IndividualContent,
} from './style';
import UserProfileInfoIndividualTitle from './title/UserProfileInfoIndividualTitle';
import UserProfileInfoIndividualAction from './action/UserProfileInfoIndividualAction';


export interface IUserProfileInfoIndividualProps {
  // ? 标识主人还是访客
  isOwner: boolean;
};


const UserProfileInfoIndividual = React.memo<IUserProfileInfoIndividualProps>((
  props: IUserProfileInfoIndividualProps,
): JSX.Element => {

  return (
    <IndividualContainer>
      <IndividualContent>
        <Row>
          <Col>
            {/* 个人信息标题区 */}
            <UserProfileInfoIndividualTitle />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* 个人信息详情区 */}
            <UserProfileInfoIndividualAction
              isOwner={props.isOwner}
            />
          </Col>
        </Row>
      </IndividualContent>
    </IndividualContainer>
  );

});


export default UserProfileInfoIndividual;