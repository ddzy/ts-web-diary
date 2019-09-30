import styled from "styled-components";


export interface IDisplayMainItemAvatarProps {
  coverUrl: string;
};


export const DisplayWrapper = styled.div``;
export const DisplayMain = styled.div`
  overflow-y: scroll;
  width: 280px;
  max-height: 300px;
  padding-top: 12px;
`;

export const DisplayMainList = styled.ul``;
export const DisplayMainItem = styled.li`
  padding: 6px 0;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f8f8f8;
  }
`;