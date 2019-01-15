import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { hot } from 'react-hot-loader';

import {
  UserContainer,
  UserMain,
} from './style';


export interface IUserProps extends RouteComponentProps<{
  id: string,
}> { };


const User = React.memo<IUserProps>((
  props: IUserProps,
): JSX.Element => {
  const { pathname } = props.location;

  return (
    <UserContainer>
      <UserMain>
        个人中心, 重构
        {pathname}
      </UserMain>
    </UserContainer>
  );
});


export default hot(module)(User);