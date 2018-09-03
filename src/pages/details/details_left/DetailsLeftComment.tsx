import * as React from 'react';

import {
  LeftCommentContainer,
} from '../style';


export interface IDetailsLeftCommentProps {};
interface IDetailLeftCommentState {};


/**
 * 评论
 */
class DetailsLeftComment extends React.PureComponent<
  IDetailsLeftCommentProps,
  IDetailLeftCommentState
> {


  public readonly state = {}


  public render(): JSX.Element {
    return (
      <LeftCommentContainer>
        评论区域
      </LeftCommentContainer>
    );
  }

}



export default DetailsLeftComment;