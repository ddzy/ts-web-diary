import styled from 'styled-components';


export interface IStyleProps {
  LoadingWrapperWidth?: string;
  LoadingWrapperHeight?: string;
  isShowSendBtnBox?: boolean;
};


//// 单个文章详情页
export const DetailsWrapper = styled<IStyleProps, 'div'>('div')`
  /* margin-top: 50px; */
  background-color: #f4f5f5;
`;

export const DetailsContent = styled<IStyleProps, 'div'>('div')`
  width: 1000px;
  margin: 0 auto;
  padding-top: 1.25rem;
`;


//// 左边文章区域
export const DetailsLeftWrapper = styled<IStyleProps, 'div'>('div')`
  padding-right: 0.625rem;
  background-color: #fff;
`;

// 左边标题
export const LeftTitleContainer = styled<IStyleProps, 'div'>('div')`
  padding: 0.625rem 0 0 3.125rem;
`;

export const LeftTitleBox = styled<IStyleProps, 'div'>('div')`

`;

export const LeftTitle = styled<IStyleProps, 'h1'>('h1')`
  font-size: 1.75rem;
  font-weight: bolder;
`;

export const LeftInfoBox = styled<IStyleProps, 'div'>('div')`

`;

export const LeftInfoList = styled<IStyleProps, 'ul'>('ul')`
  justify-content: flex-start;
`;

export const LeftInfoListItem = styled<IStyleProps, 'li'>('li')`
  display: inline-block;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;

  &:nth-of-type(1) {
    padding: 0.3125rem 0.625rem;
    background-color: #67c23a;
    color: #fff;
    line-height: 1.125rem;
    border-radius: 0.625rem;
  }
`;


// 左边内容
export const LeftContentContainer = styled<IStyleProps, 'div'>('div')`
  
`;

export const LeftContent = styled.article`
  padding: 0 1.875rem 2.5rem;
  h2::after {
    display: block;
    content: ' ';
    margin-top: 0.9375rem;
    border-bottom: 1px solid #d9dce1;
  }
  img {
    max-width: 42.5rem;
    cursor: zoom-in;
  }
  blockquote {
    padding: 0.625rem 1.4375rem;
    border-left: 4px solid #cbcbcb;
    background-color: #f8f8f8;
  }
  pre {
    padding: 1.125rem 0.9375rem 0.75rem;
    background-color: #f8f8f8;
  }
`;



// 左边评论
export const LeftCommentContainer = styled<IStyleProps, 'div'>('div')`
  margin-top: 0.625rem;
  // padding: 0 7.5rem 1.25rem 3.125rem;
  padding: 0 6.25rem 1.25rem;
  background-color: #fff;
`;

export const CommentWrapper = styled.div``;

export const CommentTipBox = styled<IStyleProps, 'div'>('div')`
  padding-top: 1.25rem;
  text-align: center;
`;

export const TipText = styled<IStyleProps, 'h3'>('h3')`
  margin-bottom: auto;
  font-size: 1.25rem;
  color: #999;
`;



export const CommentInputBox = styled<IStyleProps, 'div'>('div')`
  padding: 0 1.875rem;
  background-color: #f7f8f9;
`;

export const InputTop = styled<IStyleProps, 'div'>('div')`

`;

export const InputTopAvatar = styled<IStyleProps, 'div'>('div')`

`;

export const InputTopText = styled<IStyleProps, 'div'>('div')`

`;

export const InputBottom = styled<IStyleProps, 'div'>('div')`
  display: ${(props) => (
    props.isShowSendBtnBox ? 'block' : 'none'
  )};
`;

/// 评论区表情框
export const EmojiWrapper = styled<IStyleProps, 'div'>('div')`
  display: flex;
  width: 12.5rem;
  justify-content: space-around;
  flex-wrap: wrap;
`;
export const EmojiItem = styled<IStyleProps, 'span'>('span')`
  text-align: center;
  cursor: pointer;
  transition: transform .15s ease-in;
  &:hover {
    transform: scale(1.3, 1.3);
  }
`;


export const CommentShowBox = styled<IStyleProps, 'div'>('div')`
  margin-top: 1.875rem;
  padding: 0 1.25rem;
`;

export const CommentShowList = styled<IStyleProps, 'ul'>('ul')`

`;
export const CommentShowListItem = styled.li`
`;


//// 右边文章侧边栏区域
export const DetailsRightWrapper = styled<IStyleProps, 'div'>('div')`
  margin-left: 1.25rem;
  padding: 1.25rem 0.625rem;
  // background-color: #f2f2f2;
  background-color: #fff;
`;

export const RightMain = styled<IStyleProps, 'div'>('div')`
  padding-top: 1.25rem;
`;

// 右边文章所属个人信息框
export const RightMeInfoBox = styled<IStyleProps, 'div'>('div')`
  text-align: center;
`;

export const MeInfoAvatar = styled<IStyleProps, 'div'>('div')`
  width: 7.5rem;
  height: 7.5rem;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const MeInfoName = styled<IStyleProps, 'h2'>('h2')`
  margin-top: 0.625rem;
  font-size: 1.25rem;
`;

export const MeInfoCount = styled<IStyleProps, 'ul'>('ul')`
  margin-top: 0.9375rem;
`;

export const MeInfoCountItem = styled<IStyleProps, 'li'>('li')`
  display: inline-block;
  width: 43%;
  height: 5rem;
  line-height: 1.5625rem;
  &:nth-of-type(1) {
    border-right: 1px solid #ccc;
  }
`;


export const MeInfoCountItemNumber = styled<IStyleProps, 'p'>('p')`
  font-size: 1.125rem;
`;

export const MeInfoCountItemText = styled<IStyleProps, 'p'>('p')`
  font-size: 0.875rem;
  color: #999;
`;


// 右侧最新文章框
export const RightNewArticleBox = styled<IStyleProps, 'div'>('div')`
  margin-top: 0.625rem;
`;

export const NewArticleTip = styled<IStyleProps, 'div'>('div')`
  padding-left: 10px;
  border-left: 5px solid #1890ff;
  color: #999;
`;

export const NewArticleList = styled<IStyleProps, 'ul'>('ul')`
  list-style-type: lower-roman;
  padding-top: 0.3125rem;
  padding-left: 1.25rem;	
`;

export const NewArticleListItem = styled<IStyleProps, 'li'>('li')`
  height: 1.75rem;
  line-height: 1.75rem;
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
  top: 7.1875rem;
  left: 7rem;
  width: 2.5rem;
  background-color: #fff;
  font-size: 1.25rem;
  text-align: center;
`;

export const FixedControlContent = styled<IStyleProps, 'div'>('div')``;

export const FixedControlList = styled<IStyleProps, 'ul'>('ul')`
  margin: 0;
`;

export const FixedControlListItem = styled<IStyleProps, 'li'>('li')`
  height: 2.5rem;
  margin-top: 0.625rem;
  border-bottom: 1px solid #ccc;
  border-radius: 50%;
  color: #b2b2c2;
  &:nth-of-type(4) {
    font-size: 0.875rem;
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
  margin-top: 0.625rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  line-height: 1.875rem;
  background-color: #f4f4f4;
  cursor: pointer;
  color: #888;
  font-size: 0.875rem;
  text-align: center;
  transition: background-color .3s ease,
              color .3s ease;
  &:hover {
    background-color: #ccc;
    color: #fff;
  }
`;

export const CollectionPopFormBox = styled<IStyleProps, 'div'>('div')`

`;