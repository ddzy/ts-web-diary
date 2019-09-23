import styled from "styled-components";


export const ShowWrapper = styled.div``;
export const ShowMain = styled.div`
  margin-top: 20px;
`;

export const ShowMainLoadMoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.875rem;
  margin-top: 0.9375rem;
`;
export const ShowMainLoadMoreText = styled.span`
  color: #406599;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: .8;
  }
`;