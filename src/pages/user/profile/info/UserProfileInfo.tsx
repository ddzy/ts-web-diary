import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  InfoWrapper,
  InfoContent,
} from './style';
import UserProfileInfoAvatar from './avatar/UserProfileInfoAvatar';
import UserProfileInfoIndividual from './individual/UserProfileInfoIndividual';
import {
  IBaseCommonUserInfo,
} from 'pages/user/User.types';


export interface IUserProfileInfoProps {
  // ? 标识主人还是访客
  isOwner: boolean;
  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserInfo;
};


const UserProfileInfo = React.memo<IUserProfileInfoProps>((
  props: IUserProfileInfoProps,
): JSX.Element => {

  return (
    <InfoWrapper>
      <InfoContent>
        <Row>
          <Col span={6}>
            <UserProfileInfoAvatar
              userProfileInfo={props.userProfileInfo}
              isOwner={props.isOwner}
            />
          </Col>
          <Col span={18}>
            <UserProfileInfoIndividual
              isOwner={props.isOwner}
              userProfileInfo={props.userProfileInfo}
            />
          </Col>
        </Row>
      </InfoContent>
    </InfoWrapper>
  );

});


export default UserProfileInfo;