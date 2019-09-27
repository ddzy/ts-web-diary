import styled from "styled-components";


export const ContentWrapper = styled.div``;
export const ContentMain = styled.div`

`;

export const ContentMainList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: space-between;
`;
export const ContentMainItem = styled.li`
  width: 250px;
  margin: 24px 24px 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .02);
  cursor: pointer;
  user-select: none;
  transition: box-shadow .3s ease,
              border-color .3s ease;

  &:hover {
    box-shadow: 0 2px 40px rgba(0, 0, 0, 0.09);
    border-color: rgba(0, 0, 0, 0.09);
  }
`;