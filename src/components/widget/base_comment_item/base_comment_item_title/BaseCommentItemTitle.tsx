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
      {/* <Popover
        mouseEnterDelay={.7}
        title={handleInitAvatarPopoverTitle()}
        content={handleInitAvatarPopoverContent()}
        onVisibleChange={handleCommentAvatarHover}
      >
        <Avatar
          src={props.commentInfo.from.useravatar}
          icon="user"
          size="default"
          shape="circle"
          alt="评论者"
        />
      </Popover>
      <Divider type="vertical" />
      <span
        style={{
          color: '#999',
        }}
      >{props.commentInfo.from.username}</span> */}
      <BaseCommentItemTitleAvatar
        {...props}
      />
    </TitleContainer>
  );
});


export default BaseCommentItemTitle;