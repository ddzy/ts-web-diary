import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  InfoWrapper,
  InfoContent,
} from './style';
import UserProfileInfoAvatar from './avatar/UserProfileInfoAvatar';
import UserProfileInfoIndividual from './individual/UserProfileInfoIndividual';


export interface IUserProfileInfoProps {
  // ? 标识主人还是访客
  isOwner: boolean;
};


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
            <UserProfileInfoIndividual
              isOwner={props.isOwner}
            />
          </Col>
        </Row>
      </InfoContent>
    </InfoWrapper>
  );

});


export default UserProfileInfo;