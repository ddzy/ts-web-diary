import * as React from 'react';

import {
  CommentWrapper,
  CommentMain,
} from './style';
import {
  ICommonBasePinItemInfo,
} from '../../BasePinItem.types';
import BasePinItemActionCommentEdit from './edit/BasePinItemActionCommentEdit';
import BasePinItemActionCommentShow from './show/BasePinItemActionCommentShow';


export interface IBasePinItemActionCommentProps {
  // ? 沸点相关信息
  pinInfo: Pick<ICommonBasePinItemInfo, '_id'>;
};
export interface IBasePinItemActionCommentState { }


const BasePinItemActionComment = React.memo((props: IBasePinItemActionCommentProps) => {
  React.useEffect(() => {
    console.log('componentDidMount', props.pinInfo._id);
  }, []);

  return (
    <CommentWrapper>
      <CommentMain>
        {/* 沸点评论输入区 */}
        <BasePinItemActionCommentEdit />

        {/* 沸点评论展示区 */}
        <BasePinItemActionCommentShow />
      </CommentMain>
    </CommentWrapper>
  );
});

export default BasePinItemActionComment;