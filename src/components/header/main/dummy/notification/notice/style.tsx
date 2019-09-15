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
  width: 17.5rem;
  max-height: 18.75rem;
  padding-right: 0.9375rem;
  overflow-y: auto;
`;
export const MainContentList = styled.ul``;
export const MainContentItem = styled.li``;
// 通知主内容区域
export const MainContentItemContentBox = styled.div``;
export const MainContentItemContentInner = styled.div``;
// 通知时间展示区域
export const MainContentItemTimeBox = styled.div`
`;
export const MainContentItemTimeInner = styled.div`
  color: #999;
  font-size: 0.75rem;
  text-align: right;
`;