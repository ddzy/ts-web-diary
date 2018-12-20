import styled, {
  createGlobalStyle,
} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .article-nav-item-active {
    color: #1890ff;
  }
  .article-nav-item-default {
    color: #71777c;
  }
`;


export const NavWrapper = styled.nav`
  position: fixed;
  top: 3.75rem;
  width: 100%;
  height: 2.8125rem;
  line-height: 2.8125rem;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0.0625rem 0.3rem rgba(0,0,0,.1);
`;
export const NavContent = styled.div`
  width: 75rem;
  margin: 0 auto;
  padding: 0 7rem;
`;
export const NavContentList = styled.ul`
  display: flex;
`;
export const NavContentListItem = styled.li`
  padding: 0 .8rem;
`;