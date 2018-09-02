import * as React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import { 
  getArticleList, 
  handleArticleLoadMore,
} from './Article.redux';


export interface IArticleProps {
  ArticleReducer: { 
    article_list: object[], 
    targetUser: string,
    hasMore: boolean,
  }
  getArticleList: () => void;     // 处理首屏数据

  handleArticleLoadMore: (        // 处理加载更多
    page: number,
    pageSize: number,
    callback: () => void,
  ) => void;
};
interface IArticleState {};


class Article extends React.Component<IArticleProps, IArticleState> {

  public readonly state = {}


  public componentDidMount(): void {
    this.props.getArticleList();
  }


  //// 加载更多
  public handleLoadMore = (
    page: number, 
    pageSize: number,
    callback: () => void,
  ) => {
    this.props.handleArticleLoadMore(
      page,
      pageSize,
      callback,
    );
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        <Main 
          showTab={true}
          articleList={this.props.ArticleReducer.article_list} 
          targetUser={this.props.ArticleReducer.targetUser}
          onLoadMore={this.handleLoadMore}
          hasMore={this.props.ArticleReducer.hasMore}
        />
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    ArticleReducer: state.ArticleReducer,
  };
}
function mapDispatchToProps() {
  return {
    getArticleList,
    handleArticleLoadMore,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Article) as React.ComponentClass<any>;