import * as React from 'react';

import {
  TitleContainer,
} from './style';
import {
  ICommentListItemProps,
} from '../BaseCommentItem';
import BaseCommentItemTitleAvatar from './base_comment_item_title_avatar/BaseCommentItemTitleAvatar';


export interface IBaseCommentItemTitleProps extends ICommentListItemProps { };


const BaseCommentItemTitle = React.memo((
  props: IBaseCommentItemTitleProps,
): JSX.Element => {
  return (
    <TitleContainer>
      <BaseCommentItemTitleAvatar
        {...props}
      />
    </TitleContainer>
  );
});


export default BaseCommentItemTitle;