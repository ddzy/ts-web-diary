import * as React from 'react';

import {
  ViewWrapper,
  ViewContent,
} from './style';
import HomeMainViewPosts from './home_main_view_posts/HomeMainViewPosts';
import HomeMainViewExtra from './home_main_view_extra/HomeMainViewExtra';


export interface IHomeMainViewProps {
  articles: any[];
  initialLoading: boolean;
  onLoadMore: (
    page: number,
    pageSize: number,
    callback?: (...args: any[]) => void,
  ) => void;
};
interface IHomeMainViewState { };


class HomeMainView extends React.PureComponent<IHomeMainViewProps, IHomeMainViewState> {

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <ViewWrapper>
          <ViewContent>
            {/* 文章展示 */}
            <HomeMainViewPosts
              articles={this.props.articles}
              onLoadMore={this.props.onLoadMore}
              initialLoading={this.props.initialLoading}
            />
            {/* 额外信息 */}
            <HomeMainViewExtra />
          </ViewContent>
        </ViewWrapper>
      </React.Fragment>
    );
  }

}


export default HomeMainView;