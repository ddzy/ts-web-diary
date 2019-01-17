import * as React from 'react';

import {
  ActivityContainer,
  ActivityMain,
} from './style';


export interface IUserMainContentActivityProps { };


const UserMainContentActivity = React.memo<IUserMainContentActivityProps>((
  props: IUserMainContentActivityProps,
): JSX.Element => {

  return (
    <ActivityContainer>
      <ActivityMain>
        我的动态相关内容
      </ActivityMain>
    </ActivityContainer>
  );

});


export default UserMainContentActivity;