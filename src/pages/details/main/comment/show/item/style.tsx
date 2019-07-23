import styled from 'styled-components';


export const ItemContainer = styled.li`
`;
export const CommentContainer = styled.div``;
export const ReplyContainer = styled.div`
  height: 100%;
  padding: 0 3rem;
  margin-top: .5rem;
`;
export const ReplyList = styled.ul`
  background-color: #fafbfc;
`;
export const ReplyListItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #f1f1f1;
`;

export const ShowLoadMoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.875rem;
  margin-top: 0.9375rem;
`;
export const ShowLoadMoreText = styled.span`
  font-size: 0.75rem;
  color: #406599;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: .8;
  }
`;