import styled from 'styled-components';


// Logo
export const LogoWrapper = styled.div`
`;

export const LogoMain = styled.div`
  font-size: 2rem;
  cursor: pointer;

  i {
    transition: color .3s ease;
  }

  &:hover {
    a {
      i {
        color: #1da57a;
      }
    }
  }
`;
export const LogoMainLink = styled.a``;
