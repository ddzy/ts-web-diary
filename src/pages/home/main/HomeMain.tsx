import * as React from 'react';
import {
  withRouter, RouteComponentProps,
} from 'react-router-dom';

import HomeMainNav from './nav/HomeMainNav';
import HomeMainView from './view/HomeMainView';
import {
  MainWrapper,
  MainContent,
} from './style';


export interface IHomeMainProps extends RouteComponentProps {
};


const HomeMain = React.memo<IHomeMainProps>((
  props: IHomeMainProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <MainWrapper>
        <MainContent>
          {/* 首页二级导航 */}
          <HomeMainNav />

          {/* 首页文章展示 */}
          <HomeMainView />
        </MainContent>
      </MainWrapper>
    </React.Fragment>
  );

});


export default withRouter(HomeMain);