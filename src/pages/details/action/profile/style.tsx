import styled from "styled-components";


export const ProfileWrapper = styled.div``;
export const ProfileMain = styled.div`

`;

export const ProfileMainAvatar = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const ProfileMainName = styled.h2`
  margin-top: 0.625rem;
  font-size: 1.25rem;
  text-align: center;
`;

export const ProfileMainCountList = styled.ul`
  margin-top: 0.9375rem;
`;

export const ProfileMainCountItem = styled.li`
  display: inline-block;
  width: 50%;
  height: 5rem;
  line-height: 1.5625rem;
  text-align: center;

  &:nth-of-type(1) {
    border-right: 1px solid #ccc;
  }
`;


export const ProfileMainCountItemNumber = styled.p`
  font-size: 1.125rem;
`;

export const ProfileMainCountItemText = styled.p`
  font-size: 0.875rem;
  color: #999;
`;
