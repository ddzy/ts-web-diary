import * as React from 'react';


export interface IArticleMainViewProps { };
interface IArticleMainViewState { };


class ArticleMainView extends React.PureComponent<IArticleMainViewProps, IArticleMainViewState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <h2>ArticleMainView</h2>
      </React.Fragment>
    );
  }

}


export default ArticleMainView;