import styled from 'styled-components';


//// 左边文章区域
export const DetailsLeftWrapper = styled.div`
  padding-right: 0.625rem;
  background-color: #fff;
`;


// 左边标题
export const LeftTitleContainer = styled.div`
  padding: 0.625rem 0 0 3.125rem;
`;

export const LeftTitleBox = styled.div``;

export const LeftTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bolder;
`;

export const LeftInfoBox = styled.div``;

export const LeftInfoList = styled.ul`
  justify-content: flex-start;
`;

export const LeftInfoListItem = styled.li`
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
export const LeftContentContainer = styled.div``;

export const LeftContent = styled.article`
  color: #000;
  ul, ol {
    list-style-type: initial !important;
    padding: 0 2rem;
  }
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