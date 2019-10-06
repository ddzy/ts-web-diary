import styled from "styled-components";


export const ItemWrapper = styled.div``;
export const ItemMain = styled.div`

`;

// 标题部分
export const ItemMainTitleBox = styled.div`
  width: 30%;
`;

// 内容部分
export const ItemMainContentBox = styled.div`
  margin-top: 12px;

  a {
    &:link, &:visited {
      color: #000;
    }
    &:hover {
      color: #1DA57A;
    }
  }
`;
export const ItemMainContentTitle = styled.div`
`;
export const ItemMainContentTitleText = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;
export const ItemMainContentDescription = styled.div`
  margin-top: 12px;
`;
export const ItemMainContentDescriptionText = styled.p``;

// 额外操作部分
export const ItemMainExtraBox = styled.div`
  cursor: pointer;
`;