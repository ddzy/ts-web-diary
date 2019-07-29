import styled from 'styled-components';


export const MessageWrapper = styled.div``;
export const MessageMain = styled.div`
  overflow-y: scroll;
  max-height: 31.25rem;
`;

export const MessageMainItem = styled.div``;
export const MessageMainItemInner = styled.div`
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 10px #eee;
    transition: all .3s ease;
  }
`;