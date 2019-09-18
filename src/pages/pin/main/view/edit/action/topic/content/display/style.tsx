import styled from "styled-components";


export const DisplayWrapper = styled.div``;
export const DisplayMain = styled.div`
  width: 280px;
  padding-top: 12px;
`;

export const DisplayMainList = styled.ul``;
export const DisplayMainItem = styled.li`
  height: 54px;
  padding: 6px 0;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f8f8f8;
  }
`;

// ? 左侧头像区块
export const DisplayMainItemAvatarBox = styled.div`
  width: 42px;
  height: 42px;
`;
export const DisplayMainItemAvatar = styled.img`
  max-width: 100%;
  height: 100%;
`;

// ? 右侧信息区块
export const DisplayMainItemInfoBox = styled.div`
  padding-left: 12px;
`;

export const DisplayMainItemInfoTitle = styled.div`
  font-weight: bold;
`;
export const DisplayMainItemInfoExtra = styled.div`
  color: #666;
  font-size: 12px;
`;

export const DisplayMainItemInfoExtraFollow = styled.span`
`;
export const DisplayMainItemInfoExtraTotal = styled.span``;