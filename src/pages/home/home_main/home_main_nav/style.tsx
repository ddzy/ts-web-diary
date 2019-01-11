import styled, {
  createGlobalStyle,
} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .article-nav-item-active {
    color: #1890ff;
  }
  .article-nav-item-default {
    /* color: #71777c; */
    color: initial;
  }
`;


export const NavWrapper = styled.nav`
  width: 100%;
  height: 2.8125rem;
  line-height: 2.8125rem;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
  text-align: center;
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