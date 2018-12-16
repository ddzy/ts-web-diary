import styled from 'styled-components';


export interface INotFoundWrapperProps {
  bg_img?: string;
};


export const NotFoundWrapper = styled('div')<INotFoundWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 31.25rem;
  background-image: url(${(props) => props.bg_img});
`;

export const NotFoundContent = styled.div`

`;

export const NotFoundTitle = styled.p`
  font-size: 1.625rem;
  color: #999;
`;

export const NotFoundRedirect = styled.p`
  font-size: 1.25rem;
`;