import * as React from 'react';

import ArticleMainNav from './article_main_nav/ArticleMainNav';
import ArticleMainView from './article_main_view/ArticleMainView';
import {
  MainWrapper,
  MainContent,
} from './style';


export interface IArticleMainProps { };
interface IArticleMainState { };


class ArticleMain extends React.PureComponent<IArticleMainProps, IArticleMainState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MainWrapper>
          <MainContent>
            <ArticleMainNav />
            <ArticleMainView />
          </MainContent>
        </MainWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMain;