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
                不精通Js不着duixiang
              </TitleNameText>
            </TitleNameBox>
            <TitleDescBox>
              <TitleDescText>
                github-ddzy-奋进的二年级老猫
              </TitleDescText>
            </TitleDescBox>
          </Col>
        </Row>
      </TitleContent>
    </TitleContainer>
  );

});


export default UserProfileInfoIndividualTitle;