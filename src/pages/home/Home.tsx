import * as React from 'react';
import { connect } from 'react-redux';

import Main from '../../components/main/Main';
import { getHomeArticleList } from './Home.redux';


export interface IHomeProps {
  HomeReducer: { articleList: any[] };
  getHomeArticleList: () => void;
};
interface IHomeState {};


/**
 * 首页
 */
class Home extends React.PureComponent<IHomeProps, IHomeState> {

  public readonly state = {};


  public componentDidMount(): void {
    this.props.getHomeArticleList();
  }


  //// 加载更多
  public handleLoadMore = (page: number, pageSize: number) => {
    console.log(page, pageSize);
  }


  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Main
          showTab={false}
          articleList={this.props.HomeReducer.articleList}
          onLoadMore={this.handleLoadMore}
        />
      </React.Fragment>
    );
  }

}


function mapStateToProps(state: any) {
  return {
    HomeReducer: state.HomeReducer,
  };
}
function mapDispatchToProps() {
  return {
    getHomeArticleList,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Home);