import * as React from 'react';
import { withRouter } from 'react-router';

export interface IHomeMainViewPostsAndroidProps { };


function HomeMainViewPostsAndroid(props: IHomeMainViewPostsAndroidProps) {
  return (
    <h1>安卓文章列表</h1>
  );
}

export default withRouter(HomeMainViewPostsAndroid);