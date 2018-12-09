import styled from 'styled-components';


export const LeftTitleContainer = styled.div`
  padding: 0.625rem 0 0 3.125rem;
`;

export const LeftTitleBox = styled.div``;

export const LeftTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bolder;
`;

export const LeftInfoBox = styled.div``;

export const LeftInfoList = styled.ul`
  justify-content: flex-start;
`;

export const LeftInfoListItem = styled.li`
  display: inline-block;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;

  &:nth-of-type(1) {
    padding: 0.3125rem 0.625rem;
    background-color: #67c23a;
    color: #fff;
    line-height: 1.125rem;
    border-radius: 0.625rem;
  }
`;