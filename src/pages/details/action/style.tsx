import styled from 'styled-components';

//// 右边文章侧边栏区域
export const DetailsRightWrapper = styled.div`
  margin-left: 1.25rem;
  padding: 1.25rem 0.625rem;
  // background-color: #f2f2f2;
  background-color: #fff;
`;

export const RightMain = styled.div`
  padding-top: 1.25rem;
`;

// 右边文章所属个人信息框
export const RightMeInfoBox = styled.div`
  text-align: center;
`;

export const MeInfoAvatar = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const MeInfoName = styled.h2`
  margin-top: 0.625rem;
  font-size: 1.25rem;
`;

export const MeInfoCount = styled.ul`
  margin-top: 0.9375rem;
`;

export const MeInfoCountItem = styled.li`
  display: inline-block;
  width: 43%;
  height: 5rem;
  line-height: 1.5625rem;
  &:nth-of-type(1) {
    border-right: 1px solid #ccc;
  }
`;


export const MeInfoCountItemNumber = styled.p`
  font-size: 1.125rem;
`;

export const MeInfoCountItemText = styled.p`
  font-size: 0.875rem;
  color: #999;
`;


// 右侧最新文章框
export const RightNewArticleBox = styled.div`
  margin-top: 0.625rem;
`;

export const NewArticleTip = styled.div`
  padding-left: 10px;
  border-left: 5px solid #1da57a;
  color: #999;
`;

export const NewArticleList = styled.ul`
  list-style-type: lower-roman;
  padding-top: 0.3125rem;
  padding-left: 1.25rem;
`;

export const NewArticleListItem = styled.li`
  height: 1.75rem;
  line-height: 1.75rem;
  a {
    transition: color .5s ease;
    color: #000;
  }
  &:hover {
    a {
      color: #1da57a;
    }
  }
`;
