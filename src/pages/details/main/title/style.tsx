import styled from 'styled-components';

export interface ILeftImgInnerProps {
  imgUrl: string;
};


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

export const LeftImgBox = styled.div`
  padding-right: 2.5rem;
`;
export const LeftImgInner = styled('div')<ILeftImgInnerProps>`
  max-width: 40.625rem;
  max-height: 22.9375rem;
  min-height: ${(props) => props.imgUrl ? '20rem' : 0};
  border-radius: 6px;
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;