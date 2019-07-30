import styled, {
  createGlobalStyle,
} from 'styled-components';


// ** Global Style **
export const GlobalStyleSet = createGlobalStyle`
  .header-nav-link-active {
    color: #1DA57A;

    &&::before {
      left: 0;
      background-color: #1DA57A;
    }
    &&:after {
      right: 0;
      background-color: #1DA57A;
    }
  }
`;


export const MainNavContainer = styled.div`
`;

export const MainNavList = styled.ul`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  margin-bottom: 0;
  font-size: 1rem;
`;

export const MainNavItem = styled.li`
  overflow: hidden;
  position: relative;
  width: 3.75rem;
  height: 100%;
  margin: 0 0.625rem;
  text-align: center;

  a {
    display: block;
    height: 100%;
    transition: background-color .3s ease,
                color .3s ease;

    &:focus {
      text-decoration: none;
    }
    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.1875rem;
      background-color: #fff;
      transition: background-color .3s ease,
                  left .3s ease,
                  right .3s ease;
    }
    &::before {
      left: -100%;
      top: -0.0625rem;
    }
    &::after {
      right: -100%;
      bottom: 0;
    }
    &:hover::before {
      left: 0;
      background-color: #1DA57A;
    }
    &:hover::after {
      right: 0;
      background-color: #1DA57A;
    }
  }
`;