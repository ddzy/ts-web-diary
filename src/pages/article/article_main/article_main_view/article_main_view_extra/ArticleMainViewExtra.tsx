import * as React from 'react';

import {
  ExtraWrapper,
} from './style';


export interface IArticleMainViewExtraProps { };
interface IArticleMainViewExtraState { };


/**
 * 文章展示
 */
class ArticleMainViewPosts extends React.PureComponent<IArticleMainViewExtraProps, IArticleMainViewExtraState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ExtraWrapper />
      </React.Fragment>
    );
  }

}


export default ArticleMainViewPosts;