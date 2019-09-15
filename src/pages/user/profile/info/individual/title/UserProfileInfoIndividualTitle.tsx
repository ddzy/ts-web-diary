import * as React from 'react';
import { Row, Col, } from 'antd';

import {
  TitleContainer,
  TitleContent,
  TitleNameBox,
  TitleNameText,
  TitleDescBox,
  TitleDescText,
} from './style';
import {
  IBaseCommonUserProfileInfo,
} from 'pages/user/User.types';


export interface IUserProfileInfoIndividualTitleProps {
  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserProfileInfo;
};


const UserProfileInfoIndividualTitle = React.memo<IUserProfileInfoIndividualTitleProps>((
  props: IUserProfileInfoIndividualTitleProps,
): JSX.Element => {

  return (
    <TitleContainer>
      <TitleContent>
        <Row>
          <Col>
            <TitleNameBox>
              <TitleNameText>
                {props.userProfileInfo.username}
              </TitleNameText>
            </TitleNameBox>
            <TitleDescBox>
              <TitleDescText>
                {props.userProfileInfo.introduction}
              </TitleDescText>
            </TitleDescBox>
          </Col>
        </Row>
      </TitleContent>
    </TitleContainer>
  );

});


export default UserProfileInfoIndividualTitle;