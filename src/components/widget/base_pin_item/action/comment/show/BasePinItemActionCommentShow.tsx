import * as React from 'react';

import {
  ShowWrapper,
  ShowMain,
} from './style';


export interface IBasePinItemActionCommentShowProps { };
export interface IBasePinItemActionCommentShowState { }


const BasePinItemActionCommentShow = React.memo((props: IBasePinItemActionCommentShowProps) => {
  return (
    <ShowWrapper>
      <ShowMain>
        沸点评论展示区
      </ShowMain>
    </ShowWrapper>
  );
});

export default BasePinItemActionCommentShow;