import * as React from 'react';

import {
  ViewWrapper,
  ViewContent,
} from './style';


export interface IArticleMainViewProps { };
interface IArticleMainViewState { };


class ArticleMainView extends React.PureComponent<IArticleMainViewProps, IArticleMainViewState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ViewWrapper>
          <ViewContent>
            <h2>ArticleMainView</h2>
          </ViewContent>
        </ViewWrapper>
      </React.Fragment>
    );
  }

}


export default ArticleMainView;