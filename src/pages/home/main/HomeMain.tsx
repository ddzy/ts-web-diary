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
import {
  IStaticArticleListOptions
} from '../Home.service';


export interface IHomeMainProps extends RouteComponentProps {
  articleList: IStaticArticleListOptions[];
  globalLoading: boolean;
};


const HomeMain = React.memo<IHomeMainProps>((
  props: IHomeMainProps,
): JSX.Element => {
  return (
    <React.Fragment>
      <MainWrapper>
        <MainContent>
          <HomeMainNav/>
          <HomeMainView
            articleList={props.articleList}
            globalLoading={props.globalLoading}
          />
        </MainContent>
      </MainWrapper>
    </React.Fragment>
  );

});


export default withRouter(HomeMain);