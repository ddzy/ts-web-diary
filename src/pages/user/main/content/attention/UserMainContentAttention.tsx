import * as React from 'react';

import {
  AttentionContainer,
  AttentionMain,
} from './style';


export interface IUserMainContentAttentionProps { };


const UserMainContentAttention = React.memo<IUserMainContentAttentionProps>((
  props: IUserMainContentAttentionProps,
): JSX.Element => {

  return (
    <AttentionContainer>
      <AttentionMain>
        我的关注相关内容
      </AttentionMain>
    </AttentionContainer>
  );

});


export default UserMainContentAttention;