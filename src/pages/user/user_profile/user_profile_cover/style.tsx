import styled from 'styled-components';

export interface ICoverContentImageProps {
  url: string;
};


export const CoverWrapper = styled.div``;
export const CoverContent = styled.div`
  position: relative;
  height: 15rem;
`;

export const CoverContentImage = styled.div<ICoverContentImageProps>`
  height: 100%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const CoverContentUpload = styled.div`
  position: absolute;
  top: 0.9375rem;
  right: 0.9375rem;
`;