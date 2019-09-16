import styled, {
  createGlobalStyle,
} from 'styled-components';

export const GlobalStyleSet = createGlobalStyle`
  .am-view-posts-loadlist {
    margin-top: 1.5625rem;
    padding: 0 3rem;
  }
`;


export const PostsWrapper = styled.div`
  width: 46.25rem;
  padding-top: .5rem;
  padding-bottom: 4rem;
  background-color: #fff;
`;
export const PostsMain = styled.div`
  a {
    &:link, &:visited {
      color: #000;
    }
    &:hover {
      color: #1DA57A;
    }
  }
`;

export const PostsContentList = styled.ul``;
export const PostsContentItem = styled.li``;