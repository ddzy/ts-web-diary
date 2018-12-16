import styled from 'styled-components';


export interface IMainHeaderContentProps {
  bg_img_url?: string;        // 背景图片
};


/**
 * 收藏页 => 容器
 */
export const CollectionContainer = styled.div`
  margin-top: 3.125rem;
`;

export const CollectionMain = styled.div`

`;

/**
 * 收藏页 => 容器 => 头部
 */
export const MainHeaderWrapper = styled.div`

`;

export const MainHeaderContent = styled('div')<IMainHeaderContentProps>`
  height: 11.25rem;
  background-image: url(${(props) => props.bg_img_url});
  background-size: cover;
  background-repeat: no-repeat;
`;



/**
 * 收藏页 => 容器 => 内容
 */
export const MainContentWrapper = styled.div`
  width: 46.875rem;
  margin: 0 auto;
  background-color: #f8f9fa;
`;

export const MainContentTipBox = styled.div`
  line-height: 2.5rem;
`;

export const MainContentTipText = styled.h1`
  text-align: center;
`;

/**
 * 收藏页 文章列表 容器
 */
export const MainContentShowBox = styled.div``;