import * as React from 'react';

import {
  ContentCommentReplyFrom,
  ContentCommentReplyTo,
  ContentCommentText,
  ContentContainer,
  ContentommentReplyRange,
} from './style';
import {
  ICommonBaseArticleCommentInfo,
  ICommonBaseArticleCommentReplyInfo,
} from 'pages/details/Details.types';


export interface IBaseCommentItemContentProps {
  // ? 单个评论or回复的详细信息
  commentInfo: ICommonBaseArticleCommentReplyInfo | ICommonBaseArticleCommentInfo;
  // ? 评论回复判别
  isReply: boolean;
};


const BaseCommentItemContent = React.memo<IBaseCommentItemContentProps>((
  props: IBaseCommentItemContentProps,
): JSX.Element => {
  return (
    <ContentContainer>
      <ContentommentReplyRange isReply={props.isReply}>
        <ContentCommentReplyFrom>
          回复&nbsp;
        </ContentCommentReplyFrom>
        <ContentCommentReplyTo>
          <a>{
            (props.commentInfo as any).to
              ? (props.commentInfo as any).to.username
              : 'undefined'
          }</a>:&nbsp;&nbsp;
        </ContentCommentReplyTo>
      </ContentommentReplyRange>
      <ContentCommentText
        dangerouslySetInnerHTML={{
          __html: props.commentInfo.content_plain || '',
        }}
      />
    </ContentContainer>
  );
});


export default BaseCommentItemContent;