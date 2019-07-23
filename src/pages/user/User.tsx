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


export interface IUserProps extends RouteComponentProps {};


const User = React.memo<IUserProps>((
  props: IUserProps,
): JSX.Element => {
  return (
    <UserContainer>
      <UserContent>
        <UserProfile />
        <UserMain />
      </UserContent>
    </UserContainer>
  );
});


export default withRouter(User);