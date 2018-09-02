import styled from 'styled-components';


export interface IStyleProps {
  bg_img?: string;
};


export const NotFoundWrapper = styled<IStyleProps, 'div'>('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background-image: url(${(props) => props.bg_img});
`;

export const NotFoundContent = styled<IStyleProps, 'div'>('div')`

`;

export const NotFoundTitle = styled<IStyleProps, 'p'>('p')`
  font-size: 26px;
  color: #999;
`;

export const NotFoundRedirect = styled<IStyleProps, 'p'>('p')`
  font-size: 20px;
`;