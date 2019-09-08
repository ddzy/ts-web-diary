import styled from 'styled-components';

export interface ICoverMainImageProps {
  url: string;
};


export const CoverWrapper = styled.div``;
export const CoverMain = styled.div`
  position: relative;
  height: 15rem;
`;

export const CoverMainImage = styled.div<ICoverMainImageProps>`
  height: 100%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const CoverMainUpload = styled.div`
  position: absolute;
  top: 0.9375rem;
  right: 0.9375rem;
`;