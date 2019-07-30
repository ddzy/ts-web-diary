import styled, {
  createGlobalStyle,
} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .comment-action-reply-btn-active {
    color: #1890ff;
  }
`;


// 评论控制
export const ActionContainer = styled.blockquote`
  padding: 0 3rem;
  font-size: .8125rem;
  color: #999;
  cursor: pointer;
  user-select: none;
`;
export const ActionRightBox = styled.div`
  float: right;
`;
export const ActionLikeIconBox = styled.div`
  display: inline-block;
  &:hover {
    color: #1890ff;
  }
`;
export const ActionReplyIconBox = styled.div`
  display: inline-block;
  &:hover {
    color: #1890ff;
  }
`;
export const ActionTimeIconBox = styled.span``;

// 回复
export const ItemReplyBox = styled.div``;
