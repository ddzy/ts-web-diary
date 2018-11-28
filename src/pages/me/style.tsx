import styled from 'styled-components';


export interface IStyleProps {
  avatarUrl?: string;
  showControl?: boolean;  // 显示管理栏
};


export const MeWrapper = styled<IStyleProps, 'div'>('div')`
  min-height: 600px;
  /* margin-top: 50px; */
  padding-top: 20px;
  background-color: #f4f5f5;
`;

export const MeContent = styled<IStyleProps, 'div'>('div')`
  width: 900px;
  margin: 0 auto;
`;

export const MeInfoContainer = styled<IStyleProps, 'div'>('div')`

`;

export const MeArticleContainer = styled<IStyleProps, 'div'>('div')`
  margin-top: 15px;
`;

export const InfoAvatarBox = styled<IStyleProps, 'div'>('div')`
  width: 160px;
  height: 160px;
  // border: 1px solid #ccc;
  border-radius: 6px;
`;

export const MeName = styled<IStyleProps, 'h1'>('h1')`
  font-size: 24px;
  color: #666;
`;

export const MeGender = styled<IStyleProps, 'p'>('p')`
  font-size: 16px;
  color: #1890ff;
`;


export const MeArticleListWrapper = styled<IStyleProps, 'div'>('div')`
  margin-top: 10px;
`;

// 浏览量
export const MeArticleWatchBox = styled<IStyleProps, 'div'>('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #888;
`;

export const MeArticleWatchCount = styled<IStyleProps, 'p'>('p')`
  
`;

export const MeArticleWatchTip = styled<IStyleProps, 'p'>('p')`
  
`;


// 文章简介
export const MeArticleContentBox = styled<IStyleProps, 'div'>('div')`
  color: #999;
  font-size: 14px;
`;

export const ContentTip = styled<IStyleProps, 'div'>('div')`

`;

export const ContentTitle = styled<IStyleProps, 'h2'>('h2')`

`;

export const ContentTag = styled<IStyleProps, 'div'>('div')`
  
`;


// 文章管理 (编辑, 删除)
export const MeArticleControlBox = styled<IStyleProps, 'div'>('div')`
  
`;

export const MeArticleControl = styled<IStyleProps, 'div'>('div')`
  
`;