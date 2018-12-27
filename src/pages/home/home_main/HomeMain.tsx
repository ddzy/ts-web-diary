import * as React from 'react';

import HomeMainNav from './home_main_nav/HomeMainNav';
import HomeMainView from './home_main_view/HomeMainView';
import {
  MainWrapper,
  MainContent,
} from './style';


export interface IHomeMainProps {
  articles: any[];
  initialLoading: boolean;
  onGetArticleList: (
    type: string,
    page: number,
    pageSize: number,
  ) => void;
  onLoadMore: (
    page: number,
    pageSize: number,
    callback?: (...args: any[]) => void,
  ) => void,
};
interface IHomeMainState { };


class HomeMain extends React.PureComponent<IHomeMainProps, IHomeMainState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <MainWrapper>
          <MainContent>
            <HomeMainNav
              onGetArticleList={this.props.onGetArticleList}
            />
            <HomeMainView
              articles={this.props.articles}
              onLoadMore={this.props.onLoadMore}
              initialLoading={this.props.initialLoading}
            />
          </MainContent>
        </MainWrapper>
      </React.Fragment>
    );
  }

}


export default HomeMain;