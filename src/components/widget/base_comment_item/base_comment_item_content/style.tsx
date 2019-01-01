import styled from 'styled-components';


export interface IMiddleCommentReplyRangeProps {
  isReply: boolean;
};


export const ContentContainer = styled.div`
  padding: 0 3.1rem;
`;

export const ContentCommentText = styled.blockquote`
  display: inline-block;
  font-weight: bold;
`;

// 评论回复判别
export const ContentommentReplyRange = styled('div')<IMiddleCommentReplyRangeProps>`
  display: ${(props: IMiddleCommentReplyRangeProps) => props.isReply ? 'inline-block' : 'none'};
  font-size: .8rem;
`;
export const ContentCommentReplyFrom = styled.span``;
export const ContentCommentReplyTo = styled.span``;
