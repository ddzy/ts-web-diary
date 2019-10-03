import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ActivityContainer,
  ActivityMain,
} from './style';


export interface IUserMainContentActivityProps extends RouteComponentProps { };


const UserMainContentActivity = React.memo<IUserMainContentActivityProps>((
  props: IUserMainContentActivityProps,
): JSX.Element => {
  React.useEffect(() => {
    console.log('componentDidMount');
  }, []);

  return (
    <ActivityContainer>
      <ActivityMain>
        我的动态相关内容
      </ActivityMain>
    </ActivityContainer>
  );

});


export default withRouter(UserMainContentActivity);