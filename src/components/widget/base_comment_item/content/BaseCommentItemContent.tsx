import * as React from 'react';

import {
  ContentCommentReplyFrom,
  ContentCommentReplyTo,
  ContentCommentText,
  ContentContainer,
  ContentommentReplyRange,
} from './style';
import { ICommentListItemProps } from '../BaseCommentItem';


export interface IBaseCommentItemContentProps {
  commentInfo: Pick<ICommentListItemProps, 'isReply' | 'commentInfo'>;
};


const BaseCommentItemContent = React.memo<IBaseCommentItemContentProps>((
  props: IBaseCommentItemContentProps,
): JSX.Element => {
  return (
    <ContentContainer>
      <ContentommentReplyRange isReply={props.commentInfo.isReply}>
        <ContentCommentReplyFrom>
          回复&nbsp;
        </ContentCommentReplyFrom>
        <ContentCommentReplyTo>
          <a>{
            props.commentInfo.commentInfo.toUserInfo
              ? props.commentInfo.commentInfo.toUserInfo.username
              : undefined
          }</a>:&nbsp;&nbsp;
        </ContentCommentReplyTo>
      </ContentommentReplyRange>
      <ContentCommentText
        dangerouslySetInnerHTML={{
          __html: props.commentInfo.commentInfo.plainContent || '',
        }}
      />
    </ContentContainer>
  );
});


export default BaseCommentItemContent;