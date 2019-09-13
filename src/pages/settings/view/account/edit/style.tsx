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