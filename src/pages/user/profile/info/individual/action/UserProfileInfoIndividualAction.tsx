import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Row,
  Col,
} from 'antd';

import {
  ActionWrapper,
  ActionMain,
} from './style';
import UserProfileIndividualActionDetail from './detail/UserProfileIndividualActionDetail';
import UserProfileIndividualActionEdit from './edit/UserProfileInfoIndividualActionEdit';
import {
  IBaseCommonUserInfo,
} from 'pages/user/User.types';


export interface IUserProfileInfoIndividualActionProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 标识主人还是访客
  isOwner: boolean;
  // ? 用户的个人信息详情
  userProfileInfo: IBaseCommonUserInfo;
};
export interface IUserProfileInfoIndividualActionState {
};


const IUserProfileInfoIndividualAction = React.memo<IUserProfileInfoIndividualActionProps>((
  props: IUserProfileInfoIndividualActionProps,
): JSX.Element => {

  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={18}>
            {/* 个人信息详情区块 */}
            <UserProfileIndividualActionDetail
              userProfileInfo={props.userProfileInfo}
            />
          </Col>
          <Col span={6}>
            {/* 编辑个人信息区块 */}
            {
              props.isOwner && <UserProfileIndividualActionEdit />
            }
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );

});


export default withRouter(IUserProfileInfoIndividualAction);