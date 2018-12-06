import styled from 'styled-components';

export interface IMiddleCommentReplyRangeProps {
  isReply: boolean;
};


// 每条评论
export const ItemTopBox = styled.div`

`;

export const ItemMiddleBox = styled.div`
  padding: 0 3.1rem;
`;

export const MiddleCommentText = styled.blockquote`
  display: inline-block;
  font-weight: bold;
`;

// 评论回复判别
export const MiddleCommentReplyRange = styled.div`
  /* display: inline-block; */
  display: ${(props: IMiddleCommentReplyRangeProps) => props.isReply ? 'inline-block' : 'none'};
  font-size: .8rem;
`;
export const MiddleCommentReplyFrom = styled.span``;
export const MiddleCommentReplyTo = styled.span``;


// 评论控制
export const ItemBottomBox = styled.blockquote`
  padding: 0 3rem;
  font-size: .8125rem;
  color: #999;
  cursor: pointer;
`;
export const ItemBottomLikeBox = styled.div`
  display: inline-block;
  &:hover {
    color: #1890ff;
  }
`;
export const ItemBottomReplyBox = styled.div`
  display: inline-block;
  &:hover {
    color: #1890ff;
  }
`;

// 回复
export const ItemReplyBox = styled.div`

`;