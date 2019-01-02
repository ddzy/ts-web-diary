import * as React from 'react';

import HomeMainNav from './home_main_nav/HomeMainNav';
import HomeMainView from './home_main_view/HomeMainView';
import {
  MainWrapper,
  MainContent,
} from './style';
import {
  IStaticArticleListOptions
} from '../Home.service';


export interface IHomeMainProps {
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


export default HomeMain;