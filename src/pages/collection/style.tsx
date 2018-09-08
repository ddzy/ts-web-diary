import styled from 'styled-components';


export interface IStyleProps {
  bg_img_url?: string;        // 背景图片
};


/**
 * 收藏页 => 容器
 */
export const CollectionContainer = styled<IStyleProps, 'div'>('div')`

`;

export const CollectionMain = styled<IStyleProps, 'div'>('div')`

`;

/**
 * 收藏页 => 容器 => 头部
 */
export const MainHeaderWrapper = styled<IStyleProps, 'div'>('div')`

`;

export const MainHeaderContent = styled<IStyleProps, 'div'>('div')`
  background-image: url(${(props) => props.bg_img_url});
  background-size: cover;
  background-repeat: no-repeat;
`;



/**
 * 收藏页 => 容器 => 内容 
 */
export const MainContentWrapper = styled<IStyleProps, 'div'>('div')`

`;