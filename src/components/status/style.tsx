import styled from "styled-components";


export const StatusWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 35%;
  padding: 12px;
  background-color: #fff;
  border-radius: 12px 0 0 12px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
  cursor: pointer;
  transition: box-shadow .3s ease;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, .4);
  }
`;
export const StatusMain = styled.div`

`;

export const MainPopContent = styled.div``;
export const MainPopContentInner = styled.div``;
export const MainPopContentInnerList = styled.ul``;
export const MainPopContentInnerItem = styled.li`
  padding: 12px;
`;