import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Tabs, } from 'antd';
import {
  withRouter,
  RouteComponentProps,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  ContentContainer,
  ContentMain,
} from './style';

const LoadableUserMainContentTrack = Loadable({
  loader: () => import('./track/UserMainContentTrack'),
  loading: () => null,
});
const LoadableUserMainContentActivity = Loadable({
  loader: () => import('./activity/UserMainContentActivity'),
  loading: () => null,
});
const LoadableUserMainContentPost = Loadable({
  loader: () => import('./post/UserMainContentPost'),
  loading: () => null,
});
const LoadableUserMainContentCollection = Loadable({
  loader: () => import('./collection/UserMainContentCollection'),
  loading: () => null,
});
const LoadableUserMainContentAttention = Loadable({
  loader: () => import('./attention/UserMainContentAttention'),
  loading: () => null,
});


export interface IUserMainContentProps extends RouteComponentProps<{
  id: string,
}> {
  // ? 标识是访问者还是主人
  isOwner: boolean;
};
export interface IUserMainContentState {
};


const UserMainContent = React.memo<IUserMainContentProps>((
  props: IUserMainContentProps,
): JSX.Element => {
  /**
   * [处理] - tab切换, url改变
   * @param path url地址
   */
  function handleTabChange(
    path: string,
  ): void {
    const newPath = `${props.match.url}/${path}`;

    props.history.push(newPath);
  }

  /**
   * [处理] - tab默认指向
   * @description 与路由对应
   */
  function handleTabDefaultActive(): string {
    const { pathname } = props.location;
    const regPath = /(track)|(activity)|(collection)|(post)|(attention)/g;
    const matchedPath = pathname.match(regPath);

    return matchedPath ? matchedPath[0] : 'track';
  }

  return (
    <ContentContainer>
      <ContentMain>
        <Route exact={true} path="/user/:id" render={(p) => <Redirect to={`${p.match.url}/track`} />} />

        <Tabs
          defaultActiveKey={handleTabDefaultActive()}
          size="large"
          onChange={handleTabChange}
        >
          <Tabs.TabPane
            tab="足迹"
            key="track"
          >
            <Route path="/user/:id/track" component={LoadableUserMainContentTrack} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="动态"
            key="activity"
          >
            <Route path="/user/:id/activity" component={LoadableUserMainContentActivity} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="文章"
            key="post"
          >
            <Route path="/user/:id/post" component={LoadableUserMainContentPost} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="收藏"
            key="collection"
          >
            <Route path="/user/:id/collection" render={() => <LoadableUserMainContentCollection isOwner={props.isOwner} />} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="关注"
            key="attention"
          >
            <Route path="/user/:id/attention" component={LoadableUserMainContentAttention} />
          </Tabs.TabPane>
        </Tabs>
      </ContentMain>
    </ContentContainer>
  );

});


export default withRouter(UserMainContent || null);