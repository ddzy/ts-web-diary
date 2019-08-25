import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  ViewWrapper,
  ViewContent,
} from './style';
import HomeMainViewPosts from './posts/HomeMainViewPosts';
import HomeMainViewExtra from './extra/HomeMainViewExtra';


export interface IHomeMainViewProps extends RouteComponentProps {
};


const HomeMainView = React.memo<IHomeMainViewProps>((
  props: IHomeMainViewProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <ViewWrapper>
        <ViewContent>
          {/* 文章展示 */}
          <HomeMainViewPosts />
          {/* 额外信息 */}
          <HomeMainViewExtra />
        </ViewContent>
      </ViewWrapper>
    </React.Fragment>
  );
});


export default withRouter(HomeMainView);