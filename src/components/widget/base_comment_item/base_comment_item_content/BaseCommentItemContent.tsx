import * as React from 'react';

import {
  ContentCommentReplyFrom,
  ContentCommentReplyTo,
  ContentCommentText,
  ContentContainer,
  ContentommentReplyRange,
} from './style';
import {
  ICommentListItemProps,
} from '../BaseCommentItem';


export interface IBaseCommentItemContentProps extends ICommentListItemProps {
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
            props.commentInfo.to
              ? props.commentInfo.to.username
              : 'undefined'
          }</a>:&nbsp;&nbsp;
      </ContentCommentReplyTo>
      </ContentommentReplyRange>
      <ContentCommentText
        dangerouslySetInnerHTML={{
          __html: props.commentInfo.value || '',
        }}
      />
    </ContentContainer>
  );
});


export default BaseCommentItemContent;