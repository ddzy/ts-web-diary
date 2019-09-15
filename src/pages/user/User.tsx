import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router';

import {
  UserContainer,
  UserContent,
} from './style';
import UserProfile from './profile/UserProfile';
import UserMain from './main/UserMain';


export interface IUserProps extends RouteComponentProps<{
  id: string,
}> { };
export interface IUserState {
  // ? 标识主人还是访客
  isOwner: boolean;
};


const User = React.memo<IUserProps>((
  props: IUserProps,
): JSX.Element => {
  const [state, setState] = React.useState<IUserState>({
    isOwner: false,
  });

  React.useEffect(() => {
    handleCheckIsOwnerOrVisitor();
  }, [props.match.params.id]);


  /**
   * [处理] - 检查当前用户是访客还是主人
   */
  function handleCheckIsOwnerOrVisitor() {
    const ownerId = props.match.params.id;
    const visitorId = localStorage.getItem('userid');

    setState({
      ...state,
      isOwner: ownerId === visitorId,
    });
  }

  return (
    <UserContainer>
      <UserContent>
        {/* 个人信息展示栏 */}
        <UserProfile
          isOwner={state.isOwner}
        />

        {/* 个人动态展示栏 */}
        <UserMain />
      </UserContent>
    </UserContainer>
  );
});


export default withRouter(User);