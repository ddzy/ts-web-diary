import styled from 'styled-components';


export const SearchWrapper = styled.div`
  flex: 4;
`;
export const SearchMain = styled.div`
  /* padding: 0 9rem; */
`;
export const SearchMainInput = styled.div``;

export const PopContentBox = styled.div`
  min-width: 18.75rem;
  max-width: 20rem;
`;
export const PopContentList = styled.ul``;
export const PopContentListItem = styled.li`
  padding: 0 .5rem;
  color: initial;
  line-height: 2.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    color: #1890ff;
  }
`;
export const PopContentListSpan = styled.span`
  display: inline-block;
  margin: .3rem;
`;