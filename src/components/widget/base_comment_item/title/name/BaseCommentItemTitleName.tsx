import * as React from 'react';

import {
  NameWrapper,
  NameMain,
  NameMainText,
} from './style';
// import {
//   ICommonBaseArticleCommentInfo,
//   ICommonBaseArticleCommentReplyInfo,
// } from 'pages/details/Details.types';
import { ICommentListItemProps } from '../../BaseCommentItem';


export interface IBaseCommentItemTitleNameProps {
  // ? 评论 or 回复的基本信息
  commentInfo: Pick<ICommentListItemProps, 'commentInfo'>;
};


const BaseCommentItemTitleName = React.memo((props: IBaseCommentItemTitleNameProps) => {
  return (
    <NameWrapper>
      <NameMain>
        <NameMainText>
          {props.commentInfo.commentInfo.fromUserInfo.username}
        </NameMainText>
      </NameMain>
    </NameWrapper>
  );
});

export default BaseCommentItemTitleName;