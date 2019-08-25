import * as React from 'react';
import {
  withRouter,
} from 'react-router-dom';

import HomeMain from './main/HomeMain';
import {
  HomeWrapper,
} from './style';


export interface IHomeProps {
};
export interface IHomeState {
};


const Home = React.memo((props: IHomeProps) => {
  return (
    <HomeWrapper
    >
      <HomeMain />
    </HomeWrapper>
  );
});


export default withRouter(Home);