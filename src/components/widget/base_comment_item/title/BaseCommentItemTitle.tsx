import * as React from 'react';
import {
  Divider,
} from 'antd';

import {
  TitleWrapper,
  TitleMain,
} from './style';
import BaseCommentItemTitleAvatar from './avatar/BaseCommentItemTitleAvatar';
import BaseCommentItemTitleName from './name/BaseCommentItemTitleName';
import { ICommentListItemProps } from '../BaseCommentItem';


export interface IBaseCommentItemTitleProps {
  commentInfo: Pick<ICommentListItemProps, 'isAllowAvatarHover' | 'isReply' | 'commentInfo'>;
};


const BaseCommentItemTitle = React.memo((
  props: IBaseCommentItemTitleProps,
): JSX.Element => {
  return (
    <TitleWrapper>
      <TitleMain>
        {/* 左边头像框 */}
        <BaseCommentItemTitleAvatar
          commentInfo={props.commentInfo}
        />

        <Divider type="vertical" />

        {/* 右边名称框 */}
        <BaseCommentItemTitleName
          commentInfo={props.commentInfo}
        />
      </TitleMain>
    </TitleWrapper>
  );
});


export default BaseCommentItemTitle;