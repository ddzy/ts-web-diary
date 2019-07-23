import * as React from 'react';
import { withRouter } from 'react-router-dom';

export interface IHomeMainViewPostsBackendProps { };


function HomeMainViewPostsBackend(props: IHomeMainViewPostsBackendProps) {
  return (
    <h1>后端文章列表</h1>
  );
}

export default withRouter(HomeMainViewPostsBackend);