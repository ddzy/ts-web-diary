import * as React from 'react';

import {
  PostContainer,
  PostMain,
} from './style';


export interface IUserMainContentPostProps { };


const UserMainContentPost = React.memo<IUserMainContentPostProps>((
  props: IUserMainContentPostProps,
): JSX.Element => {

  return (
    <PostContainer>
      <PostMain>
        我的文章相关内容
      </PostMain>
    </PostContainer>
  );

});


export default UserMainContentPost;