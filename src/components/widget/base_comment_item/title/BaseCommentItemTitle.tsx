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
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseArticleCommentReplyInfo,
} from 'pages/details/Details.types';


export interface IBaseCommentItemTitleProps {
  // ? 是否允许头像框hover
  isAllowAvatarHover?: boolean;
  // ? 判断是评论还是回复
  isReply: boolean;
  // ? 单个评论或回复的详细信息
  commentInfo: ICommonBaseArticleCommentReplyInfo | ICommonBaseArticleCommentInfo;
};


const BaseCommentItemTitle = React.memo((
  props: IBaseCommentItemTitleProps,
): JSX.Element => {
  return (
    <TitleWrapper>
      <TitleMain>
        {/* 左边头像框 */}
        <BaseCommentItemTitleAvatar
          isAllowAvatarHover={props.isAllowAvatarHover}
          isReply={props.isReply}
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