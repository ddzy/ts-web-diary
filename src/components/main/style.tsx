import styled from 'styled-components';


export interface IStyleProps {};


// 文章列表
export const MainWrapper = styled<IStyleProps, 'div'>('div')`
  margin-top: 50px;
  background-color: #f4f5f5;
`;

export const MainContent = styled<IStyleProps, 'div'>('div')`
  width: 900px;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
`;

export const ContentWrapper = styled<IStyleProps, 'div'>('div')`

`;

export const ContentCarousel = styled<IStyleProps, 'div'>('div')`
  
`;

export const ContentArtical = styled<IStyleProps, 'div'>('div')`
  margin-top: 50px;
`;

