import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  Route,
  Switch,
} from 'react-router-dom';

import {
  TopicWrapper,
  TopicMain,
} from './style';

const LoadableTopicAll = Loadable({
  loader: () => import('./all/TopicAll'),
  loading: () => null,
});
const LoadableTopicSingle = Loadable({
  loader: () => import('./single/TopicSingle'),
  loading: () => null,
});


export interface ITopicProps { };
export interface ITopicState { };


const Topic = React.memo((props: ITopicProps) => {
  return (
    <TopicWrapper>
      <TopicMain>
        <Switch>
          {/* 全部话题页 */}
          <Route exact path="/topic" component={LoadableTopicAll} />

          {/* 单个话题详情页 */}
          <Route path="/topic/:id" component={LoadableTopicSingle} />
        </Switch>
      </TopicMain>
    </TopicWrapper>
  );
});


export default Topic;