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


export interface IUserProfileInfoIndividualActionProps extends RouteComponentProps<{
  id: string,
}> { };
export interface IUserProfileInfoIndividualActionState {
  // ? 标识是主人还是访客
  isOwner: boolean;
};


const IUserProfileInfoIndividualAction = React.memo<IUserProfileInfoIndividualActionProps>((
  props: IUserProfileInfoIndividualActionProps,
): JSX.Element => {

  const [state, setState] = React.useState<IUserProfileInfoIndividualActionState>({
    isOwner: false,
  });

  React.useEffect(() => {
    handleCheckIsOwner();
  }, [props.match.params.id]);


  /**
   * [处理] - 检查当前用户是访客还是主人
   */
  function handleCheckIsOwner() {
    const ownerId = props.match.params.id;
    const visitorId = localStorage.getItem('userid');

    setState({
      ...state,
      isOwner: ownerId === visitorId,
    });
  }

  return (
    <ActionWrapper>
      <ActionMain>
        <Row>
          <Col span={18}>
            {/* 个人信息详情区块 */}
            <UserProfileIndividualActionDetail />
          </Col>
          <Col span={6}>
            {/* 编辑个人信息区块 */}
            {
              state.isOwner && <UserProfileIndividualActionEdit />
            }
          </Col>
        </Row>
      </ActionMain>
    </ActionWrapper>
  );

});


export default withRouter(IUserProfileInfoIndividualAction);