import styled from "styled-components";


export const EditWrapper = styled.div``;
export const EditMain = styled.div`
  width: 690px;
  padding: 10px 50px 20px 50px;
`;

export const EditMainList = styled.ul``;
export const EditMainItem = styled.li`
  height: 70px;
  border-top: 1px solid #f6f6f6;
  line-height: 70px;

  &:nth-child(1) {
    border-top: none;
  }
  &::nth-last-of-type() {
    border-bottom: 1px solid #f6f6f6;
  }
`;

export const EditMainItemTitleText = styled.span`
  display: inline-block;
  margin-left: 8px;
`;
export const EditMainItemContentText = styled.span`
  color: #999;
`;
export const EditMainItemActionText = styled.span`
  color: #1da57a;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`;