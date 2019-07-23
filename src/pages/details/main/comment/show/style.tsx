import styled from 'styled-components';


export const ShowContainer = styled.div`
  margin-top: 1.875rem;
  padding-left: 3rem;
`;

export const ShowList = styled.ul``;

export const ShowLoadMoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.875rem;
  margin-top: 0.9375rem;
`;
export const ShowLoadMoreText = styled.span`
  color: #406599;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: .8;
  }
`;