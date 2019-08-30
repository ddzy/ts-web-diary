import styled from 'styled-components';


export const NoticeWrapper = styled.div``;
export const NoticeMain = styled.div`
  text-align: right;
  color: #8590a6;
  cursor: pointer;
  svg {
    width: 1.3rem;
    height: 1.3rem;
  };
  svg {
    &:hover {
      color: #1DA57A;
    }
  }
`;

export const MainContent = styled.div`
  width: 280px;
  max-height: 300px;
  overflow-y: auto;
`;
export const MainContentList = styled.ul``;
export const MainContentItem = styled.li``;