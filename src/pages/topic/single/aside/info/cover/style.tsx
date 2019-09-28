import styled from "styled-components";


export interface ICoverMainImageProps {
  coverImgUrl: string;
};


export const CoverWrapper = styled.div``;
export const CoverMain = styled.div`

`;

export const CoverMainImageBox = styled.div`
  overflow: hidden;
`;
export const CoverMainImage = styled('div')<ICoverMainImageProps>`
  height: 110px;
  background-image: url(${(props) => props.coverImgUrl});
  background-position: 50%;
  background-size: 120%;
  background-repeat: no-repeat;
  filter: blur(6.3px);
  transform: scale(1.1);
`;