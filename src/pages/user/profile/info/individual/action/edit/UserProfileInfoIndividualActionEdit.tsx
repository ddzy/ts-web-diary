import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Button,
} from 'antd';

import {
  EditWrapper,
  EditMain,
} from './style';


export interface IUserProfileIndividualActionEditProps extends RouteComponentProps { };
export interface IUserProfileIndividualActionEditState { }


const UserProfileIndividualActionEdit = React.memo((props: IUserProfileIndividualActionEditProps) => {

  /**
   * [处理] - 跳转至用户设置页
   */
  function handleLinkToUserSettingsPage() {
    props.history.push('/settings');
  }

  return (
    <EditWrapper>
      <EditMain>
        <Button
          type="dashed"
          icon="edit"
          onClick={handleLinkToUserSettingsPage}
        >编辑个人信息</Button>
      </EditMain>
    </EditWrapper>
  );
});

export default withRouter(UserProfileIndividualActionEdit);