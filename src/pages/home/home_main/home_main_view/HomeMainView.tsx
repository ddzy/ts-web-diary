import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import {
  ViewWrapper,
  ViewContent,
} from './style';
import HomeMainViewPosts from './home_main_view_posts/HomeMainViewPosts';
import HomeMainViewExtra from './home_main_view_extra/HomeMainViewExtra';


export interface IHomeMainViewProps extends RouteComponentProps {
  articleList: any[];
  globalLoading: boolean;
};


const HomeMainView = React.memo<IHomeMainViewProps>((
  props: IHomeMainViewProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <ViewWrapper>
        <ViewContent>
          {/* 文章展示 */}
          <HomeMainViewPosts
            articleList={props.articleList}
            globalLoading={props.globalLoading}
          />
          {/* 额外信息 */}
          <HomeMainViewExtra />
        </ViewContent>
      </ViewWrapper>
    </React.Fragment>
  );
});


export default withRouter(HomeMainView);