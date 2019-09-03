import styled from "styled-components";


export const TocWrapper = styled.div``;
export const TocMain = styled.div`
  padding-top: 20px;
`;

// 标题区
export const TocMainTitle = styled.div`
  height: 40px;
  padding-left: 20px;
  line-height: 40px;
  border-left: 4px solid #1da57a;
`;
export const TocMainTitleInner = styled.span`
  color: #999;
`;

// 内容区
export const TocMainContent = styled.div``;
export const TocMainContentInner = styled.div`
  position: relative;
  overflow: hidden;
  padding: 20px 0 0 20px;

  li {
    margin: 8px 0;
  }
`;