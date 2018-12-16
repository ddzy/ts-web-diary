import styled from 'styled-components';


export const MainNavContainer = styled.div`
  flex: 6;
`;

export const MainNavList = styled.ul`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  font-size: 1rem;
`;

export const MainNavItem = styled.li`
  width: 3.75rem;
  height: 100%;
  margin: 0 0.625rem;
  text-align: center;
  transition: background-color .3s ease,
              color .3s ease;
  &:hover {
    background-color: #1890ff;
    a {
      color:  #fff;
    }
  }

  a {
    display: block;
    height: 100%;
  }
`;
