import * as React from 'react';

import {
  ContentCommentReplyFrom,
  ContentCommentReplyTo,
  ContentCommentText,
  ContentContainer,
  ContentommentReplyRange,
} from './style';


export interface IBaseCommentItemContentProps {
  // ** 评论回复判别 **
  isReply: boolean;
  value: string;
  to?: {
    _id: string,
    username: string,
    useravatar: string,
  };
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
            props.to
              ? props.to.username
              : 'undefined'
          }</a>:&nbsp;&nbsp;
      </ContentCommentReplyTo>
      </ContentommentReplyRange>
      <ContentCommentText
        dangerouslySetInnerHTML={{
          __html: props.value || '',
        }}
      />
    </ContentContainer>
  );
});


export default BaseCommentItemContent;