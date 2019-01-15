import styled from 'styled-components';


export const ProfileContainer = styled.div``;
export const ProfileMain = styled.div`
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