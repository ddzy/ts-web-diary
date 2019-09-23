import styled from "styled-components";


export const ItemWrapper = styled.div``;
export const ItemMain = styled.div`

`;

// 评论容器
export const ItemMainCommentBox = styled.div``;


// 回复容器
export const ItemMainReplyBox = styled.div`
  height: 100%;
  padding: 0 3rem;
  margin-top: .5rem;
`;

export const ItemMainReplyList = styled.ul`
  background-color: #fafbfc;
`;
export const ItemMainReplyItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #f1f1f1;
`;

// 回复加载更多的按钮
export const ItemMainLoadMoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.875rem;
  margin-top: 0.9375rem;
`;
export const ItemMainLoadMoreText = styled.span`
  font-size: 0.75rem;
  color: #406599;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: .8;
  }
`;