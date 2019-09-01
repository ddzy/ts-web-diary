import * as React from 'react';

import {
  NameWrapper,
  NameMain,
  NameMainText,
} from './style';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseArticleCommentReplyInfo,
} from 'pages/details/Details.types';


export interface IBaseCommentItemTitleNameProps {
  // ? 评论 or 回复的基本信息
  commentInfo: ICommonBaseArticleCommentReplyInfo | ICommonBaseArticleCommentInfo;
};


const BaseCommentItemTitleName = React.memo((props: IBaseCommentItemTitleNameProps) => {
  return (
    <NameWrapper>
      <NameMain>
        <NameMainText>
          {props.commentInfo.from.username}
        </NameMainText>
      </NameMain>
    </NameWrapper>
  );
});

export default BaseCommentItemTitleName;