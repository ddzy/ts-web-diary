import styled from 'styled-components';


export interface IStyleProps {
  bg_img_url?: string;        // 背景图片
};


/**
 * 收藏页 => 容器
 */
export const CollectionContainer = styled<IStyleProps, 'div'>('div')`
  margin-top: 50px;
`;

export const CollectionMain = styled<IStyleProps, 'div'>('div')`

`;

/**
 * 收藏页 => 容器 => 头部
 */
export const MainHeaderWrapper = styled<IStyleProps, 'div'>('div')`

`;

export const MainHeaderContent = styled<IStyleProps, 'div'>('div')`
  height: 180px;
  background-image: url(${(props) => props.bg_img_url});
  background-size: cover;
  background-repeat: no-repeat;
`;



/**
 * 收藏页 => 容器 => 内容 
 */
export const MainContentWrapper = styled<IStyleProps, 'div'>('div')`
  width: 750px;
  margin: 0 auto;
  background-color: #f8f9fa;
`;

export const MainContentTipBox = styled<IStyleProps, 'div'>('div')`
  line-height: 40px;
`;

export const MainContentTipText = styled<IStyleProps, 'h1'>('h1')`
  text-align: center;
  color: #999;
`;

/**
 * 收藏页 文章列表 容器
 */
export const MainContentShowBox = styled<IStyleProps, 'div'>('div')`

`;