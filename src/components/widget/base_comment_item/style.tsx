import styled from 'styled-components';

export interface IMiddleCommentReplyRangeProps {
  isReply: boolean;
};


// 每条评论
export const ItemTopBox = styled.div`
  cursor: pointer;
`;

// 评论者信息popover框
export const PopoverTitleContainer = styled.div``;
export const PopoverTitleMain = styled.div`
  display: flex;
`;
export const TitleMainAvatar = styled.div``;
export const TitleMainName = styled.div`
  line-height: 4rem;
  margin-left: 0.625rem;
`;
export const PopoverContentContainer = styled.div``;
export const PopoverContentMain = styled.div`
  width: 15rem;
  font-weight: bold;
  text-align: center;
`;
export const ContentMainArticleCountBox = styled.div``;
export const ContentMainArticleCountText = styled.p`
  font-size: 1.125rem;
`;
export const ContentMainArticleCountTip = styled.p`
  color: #999;
`;
export const ContentMainLikedCountBox = styled.div``;
export const ContentMainLikedCountText = styled.p`
  font-size: 1.125rem;
`;
export const ContentMainLikedCountTip = styled.p`
  color: #999;
`;
export const ContentMainFocusedCountBox = styled.div``;
export const ContentMainFocusedCountText = styled.p`
  font-size: 1.125rem;
`;
export const ContentMainFocusedCountTip = styled.p`
  color: #999;
`;


export const ItemMiddleBox = styled.div`
  padding: 0 3.1rem;
`;

export const MiddleCommentText = styled.blockquote`
  display: inline-block;
  font-weight: bold;
`;

// 评论回复判别
export const MiddleCommentReplyRange = styled('div')<IMiddleCommentReplyRangeProps>`
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
  user-select: none;
`;
export const ItemBottonRightBox = styled.div`
  float: right;
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
export const ItemBottomTimeBox = styled.span``;

// 回复
export const ItemReplyBox = styled.div`

`;
