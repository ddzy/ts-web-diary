import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { hot } from 'react-hot-loader';

import {
  UserContainer,
  UserContent,
} from './style';
import UserProfile from './user_profile/UserProfile';
import UserMain from './user_main/UserMain';


export interface IUserProps extends RouteComponentProps<{
  id: string,
}> {};


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


export default hot(module)(User);