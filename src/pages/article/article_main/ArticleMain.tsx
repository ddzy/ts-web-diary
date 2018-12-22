import * as React from 'react';

import ArticleMainNav from './article_main_nav/ArticleMainNav';
import ArticleMainView from './article_main_view/ArticleMainView';
import {
  MainWrapper,
  MainContent,
} from './style';


export interface IArticleMainProps {
  articles: any[];
};
interface IArticleMainState { };


class ArticleMain extends React.PureComponent<IArticleMainProps, IArticleMainState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MainWrapper>
          <MainContent>
            <ArticleMainNav />
            <ArticleMainView
              articles={this.props.articles}
            />
          </MainContent>
        </MainWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMain;