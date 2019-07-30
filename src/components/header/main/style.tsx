import styled, {
  createGlobalStyle,
} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .header-main-container-scrolled {
    transform: translateY(-100%) !important;
  }
  /* .header-main-container-noscroll {
    transform: translateY(0);
  } */
`;

export const MainContainer = styled.div`
  width: 75rem;
  height: 3.75rem;
  margin: 0 auto;
  line-height: 3.75rem;
  text-align: center;
  transition: transform .3s ease;
  transform: translateY(0);
`;

export const MainInner = styled.div`
  /* display: flex; */
  height: 100%;
`;

export const MainOuter = styled.div`
  display: flex;
  height: 100%;
  background-color: #fff;
`;