import * as React from 'react';

import {
  PostContainer,
  PostMain,
} from './style';
import UserMainContentPostDisplay from './display/UserMainContentPostDisplay';


export interface IUserMainContentPostProps { };


const UserMainContentPost = React.memo<IUserMainContentPostProps>((
  props: IUserMainContentPostProps,
): JSX.Element => {

  return (
    <PostContainer>
      <PostMain>
        {/* 文章列表区块 */}
        <UserMainContentPostDisplay />
      </PostMain>
    </PostContainer>
  );

});


export default UserMainContentPost;