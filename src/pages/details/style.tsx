import styled from 'styled-components';


export interface IStyleProps {
  LoadingWrapperWidth?: string;
  LoadingWrapperHeight?: string;
};


//// 单个文章详情页
export const DetailsWrapper = styled<IStyleProps, 'div'>('div')`
  margin-top: 50px;
  // background-color: #f4f5f5;
`;

export const DetailsContent = styled<IStyleProps, 'div'>('div')`
  width: 1100px;
  margin: 0 auto;
  padding-top: 20px;
  // background-color: #fff;
`;


//// 左边文章区域
export const DetailsLeftWrapper = styled<IStyleProps, 'div'>('div')`
  padding-right: 10px;
`;

// 左边标题
export const LeftTitleContainer = styled<IStyleProps, 'div'>('div')`

`;

export const LeftTitleBox = styled<IStyleProps, 'div'>('div')`

`;

export const LeftTitle = styled<IStyleProps, 'h1'>('h1')`
  font-size: 24px;
  font-weight: bold;
`;

export const LeftInfoBox = styled<IStyleProps, 'div'>('div')`

`;

export const LeftInfoList = styled<IStyleProps, 'ul'>('ul')`
  justify-content: flex-start;
`;

export const LeftInfoListItem = styled<IStyleProps, 'li'>('li')`
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;

  &:nth-of-type(1) {
    padding: 5px 10px;
    background-color: #67c23a;
    color: #fff;
    line-height: 18px;
    border-radius: 10px;
  }
`;


// 左边内容
export const LeftContentContainer = styled<IStyleProps, 'div'>('div')`

`;

export const LeftContent = styled<IStyleProps, 'div'>('div')`

`;


// 左边评论
export const LeftCommentContainer = styled<IStyleProps, 'div'>('div')`
  
`;

export const CommentInputBox = styled<IStyleProps, 'div'>('div')`
  padding: 0 30px;
`;

export const InputTop = styled<IStyleProps, 'div'>('div')`

`;

export const InputTopAvatar = styled<IStyleProps, 'div'>('div')`

`;

export const InputTopText = styled<IStyleProps, 'div'>('div')`

`;

export const InputBottom = styled<IStyleProps, 'div'>('div')`

`;


export const CommentShowBox = styled<IStyleProps, 'div'>('div')`

`;

export const CommentShowList = styled<IStyleProps, 'ul'>('ul')`

`;

export const CommentShowListItem = styled<IStyleProps, 'li'>('li')`

`;




//// 右边文章侧边栏区域
export const DetailsRightWrapper = styled<IStyleProps, 'div'>('div')`
  padding: 20px 10px;
  background-color: #f2f2f2;
`;

export const RightMain = styled<IStyleProps, 'div'>('div')`
  padding-top: 20px;
`;

// 右边文章所属个人信息框
export const RightMeInfoBox = styled<IStyleProps, 'div'>('div')`
  text-align: center;
`;

export const MeInfoAvatar = styled<IStyleProps, 'div'>('div')`
  width: 120px;
  height: 120px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const MeInfoName = styled<IStyleProps, 'h2'>('h2')`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
`;

export const MeInfoCount = styled<IStyleProps, 'ul'>('ul')`
  margin-top: 15px;
`;

export const MeInfoCountItem = styled<IStyleProps, 'li'>('li')`
  display: inline-block;
  width: 43%;
  height: 80px;
  line-height: 25px;
  &:nth-of-type(1) {
    border-right: 1px solid #ccc;
  }
`;


export const MeInfoCountItemNumber = styled<IStyleProps, 'p'>('p')`
  font-size: 18px;
  font-weight: 500;
`;

export const MeInfoCountItemText = styled<IStyleProps, 'p'>('p')`
  font-size: 14px;
  color: #999;
`;


// 右侧最新文章框
export const RightNewArticleBox = styled<IStyleProps, 'div'>('div')`
  margin-top: 10px;
`;

export const NewArticleTip = styled<IStyleProps, 'div'>('div')`
  padding-left: 10px;
  border-left: 5px solid #1890ff;
  color: #999;
`;

export const NewArticleList = styled<IStyleProps, 'ul'>('ul')`
  list-style-type: lower-roman;
  padding-top: 5px;
  padding-left: 20px;	
`;

export const NewArticleListItem = styled<IStyleProps, 'li'>('li')`
  height: 28px;
  line-height: 28px;
  a {
    transition: color .5s ease;
    color: #000;
  }
  &:hover {
    a {
      color: #1890ff;
    }
  }
`;