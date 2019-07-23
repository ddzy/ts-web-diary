import styled from 'styled-components';


export const ContentContainer = styled.div``;
export const ContentMain = styled.div`
  padding: 0.625rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .02);
  transition: box-shadow .3s ease,
              border-color .3s ease;
  &:hover {
    box-shadow: 0 2px 40px rgba(0, 0, 0, 0.09);
    border-color: rgba(0, 0, 0, 0.09);
  }
`;