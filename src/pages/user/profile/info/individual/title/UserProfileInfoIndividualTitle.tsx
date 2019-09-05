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


export interface IUserProfileInfoIndividualTitleProps { };


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
                username
              </TitleNameText>
            </TitleNameBox>
            <TitleDescBox>
              <TitleDescText>
                website
              </TitleDescText>
            </TitleDescBox>
          </Col>
        </Row>
      </TitleContent>
    </TitleContainer>
  );

});


export default UserProfileInfoIndividualTitle;