import styled from "styled-components";


export const LatestWrapper = styled.div``;
export const LatestMain = styled.div`

`;

export const LatestMainArticleBox = styled.div`
  margin-top: 0.625rem;
  padding: 1.5rem;
`;

export const LatestMainArticleTip = styled.div`
  padding-left: 10px;
  border-left: 5px solid #1da57a;
  color: #999;
`;

export const LatestMainArticleList = styled.ul`
  list-style-type: lower-roman;
  padding: 1rem;
`;

export const LatestMainArticleListItem = styled.li`
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