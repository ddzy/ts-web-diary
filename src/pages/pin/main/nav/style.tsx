import styled from "styled-components";


export const NavWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 40px rgba(0, 0, 0, 0.09);
  border-color: rgba(0, 0, 0, 0.09);
`;
export const NavMain = styled.div`
  padding: 12px;
`;

export const NavMainList = styled.ul``;
export const NavMainItem = styled.li`
  margin: 12px 0;
  padding: 6px 20px;
  border-radius: 6px;
  text-align: center;

  &:hover {
    background-color: #f7f7f7;
    color: #1da57a;

    a {
      color: #1da57a;
    }
  }

  a {
    &:link, &:visited {
      color: #999;
    }
    &:hover {
      color: #1da57a;
    }
  }
`;