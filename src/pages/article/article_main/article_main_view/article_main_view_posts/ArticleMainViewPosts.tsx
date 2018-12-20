import * as React from 'react';

import {
  PostsWrapper,
  PostsContentList,
  PostsContentItem,
} from './style';


export interface IArticleMainViewPostsProps { };
interface IArticleMainViewPostsState { };


/**
 * 文章展示
 */
class ArticleMainViewPosts extends React.PureComponent<IArticleMainViewPostsProps, IArticleMainViewPostsState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <PostsWrapper>
          <PostsContentList>
            <PostsContentItem>

            </PostsContentItem>
          </PostsContentList>
        </PostsWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMainViewPosts;