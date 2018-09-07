import styled from 'styled-components';


export interface IStyleProps {
  LoadingWrapperWidth?: string;
  LoadingWrapperHeight?: string;
};


//// 单个文章详情页
export const DetailsWrapper = styled<IStyleProps, 'div'>('div')`
  margin-top: 50px;
  background-color: #f4f5f5;
`;

export const DetailsContent = styled<IStyleProps, 'div'>('div')`
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
`;


//// 左边文章区域
export const DetailsLeftWrapper = styled<IStyleProps, 'div'>('div')`
  padding-right: 10px;
  background-color: #fff;
`;

// 左边标题
export const LeftTitleContainer = styled<IStyleProps, 'div'>('div')`
  padding: 10px 0 0 50px;
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
  margin-top: 10px;
  // padding: 0 120px 20px 50px;
  padding: 0 100px 20px;
  background-color: #fff;
`;


export const CommentTipBox = styled<IStyleProps, 'div'>('div')`
  padding-top: 40px;
  background-color: #f7f8f9;
  text-align: center;
`;

export const TipText = styled<IStyleProps, 'h3'>('h3')`
  margin-bottom: auto;
  font-size: 20px;
  color: #999;
`;



export const CommentInputBox = styled<IStyleProps, 'div'>('div')`
  padding: 0 30px;
  background-color: #f7f8f9;
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
  margin-top: 20px;
  padding: 0 20px;
`;

export const CommentShowList = styled<IStyleProps, 'ul'>('ul')`

`;

// 每条评论
export const CommentShowListItem = styled<IStyleProps, 'li'>('li')`
`;

export const ItemTopBox = styled<IStyleProps, 'div'>('div')`

`;

export const ItemMiddleBox = styled<IStyleProps, 'div'>('div')`
  padding: 0 44px;
`;

export const MiddleCommentText = styled<IStyleProps, 'blockquote'>('blockquote')`
  font-weight: bold;
`;

export const ItemBottomBox = styled<IStyleProps, 'div'>('div')`
  padding: 0 48px;
  color: #999;
`;

// 回复
export const ItemReplyBox = styled<IStyleProps, 'div'>('div')`
  position: relative;
  margin-top: 10px;
  padding: 0 48px;
  min-height: 200px;
  &::after {
    content: '';
    position: absolute;
    left: 77px;
    top: -16px;
    border 8px solid transparent;
    border-bottom: 8px solid #eaeaea;
  }
`;

export const ItemReplyContent = styled<IStyleProps, 'div'>('div')`
  height: 100%;
  border: 1px solid #eaeaea;
`;

export const ReplyList = styled<IStyleProps, 'ul'>('ul')`
  padding: 20px 40px 20px 10px;
`;

export const ReplyListItem = styled<IStyleProps, 'li'>('li')`

`;

export const ReplyInput = styled<IStyleProps, 'div'>('div')`
  padding: 0 40px;
  padding-top: 23px;
`;





//// 右边文章侧边栏区域
export const DetailsRightWrapper = styled<IStyleProps, 'div'>('div')`
  margin-left: 20px;
  padding: 20px 10px;
  // background-color: #f2f2f2;
  background-color: #fff;
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



//// 文章详情页 => 左侧固钉控制栏
export const FixedControlContainer = styled<IStyleProps, 'div'>('div')`
  position: fixed;
  top: 115px;
  left: 100px;
  width: 40px;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
`;

export const FixedControlContent = styled<IStyleProps, 'div'>('div')`

`;

export const FixedControlList = styled<IStyleProps, 'ul'>('ul')`
  margin: 0;
`;

export const FixedControlListItem = styled<IStyleProps, 'li'>('li')`
  height: 40px;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  border-radius: 50%;
  &:nth-of-type(4) {
    font-size: 14px;
    color: #999;
  }
  &:nth-of-type(7) {
    border-bottom: none;
  }
`;

// 固钉栏 收藏 气泡框
export const CollectionPopContentContainer = styled<IStyleProps, 'div'>('div')`

`;

export const CollectionsPopShowList = styled<IStyleProps, 'ul'>('ul')`

`;

export const CollectionsPopShowListItem = styled<IStyleProps, 'li'>('li')`
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  line-height: 20px;
  background-color: #f4f4f4;
  cursor: pointer;
`;

export const CollectionPopFormBox = styled<IStyleProps, 'div'>('div')`

`;