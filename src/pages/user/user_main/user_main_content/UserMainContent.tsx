import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Tabs, } from 'antd';
import {
  withRouter,
  RouteComponentProps,
  Route,
} from 'react-router-dom';

import {
  ContentContainer,
  ContentMain,
} from './style';

const LoadableUserMainContentActivity = Loadable({
  loader: () => import('./user_main_content_activity/UserMainContentActivity'),
  loading: () => null,
});
const LoadableUserMainContentPost = Loadable({
  loader: () => import('./user_main_content_post/UserMainContentPost'),
  loading: () => null,
});
const LoadableUserMainContentCollection = Loadable({
  loader: () => import('./user_main_content_collection/UserMainContentCollection'),
  loading: () => null,
});
const LoadableUserMainContentAttention = Loadable({
  loader: () => import('./user_main_content_attention/UserMainContentAttention'),
  loading: () => null,
});


export interface IUserMainContentProps extends RouteComponentProps<any> {
  children?: React.ReactElement<HTMLElement>
};


const UserMainContent = React.memo<IUserMainContentProps>((
  props: IUserMainContentProps,
): JSX.Element => {

  /**
   * 处理tab切换, url改变
   * @param path url地址
   */
  function handleTabChange(
    path: string,
  ): void {
    const userId: string = localStorage.getItem('userid') || '';
    props.history.replace(`/user/${userId}/${path}`);
  }

  /**
   * 处理tab默认指向
   */
  function handleTabDefaultActive(): string {
    const { pathname } = props.location;

    return pathname.substring(
      pathname.lastIndexOf('/') + 1,
    );
  }

  return (
    <ContentContainer>
      <ContentMain>
        <Tabs
          defaultActiveKey={handleTabDefaultActive()}
          size="large"
          onChange={handleTabChange}
        >
          <Tabs.TabPane
            tab="动态"
            key="activity"
          >
            <Route exact path="/user/:id/activity" component={LoadableUserMainContentActivity} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="文章"
            key="post"
          >
            <Route exact path="/user/:id/post" component={LoadableUserMainContentPost} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="收藏"
            key="collection"
          >
            <Route exact path="/user/:id/collection" component={LoadableUserMainContentCollection} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="关注"
            key="attention"
          >
            <Route exact path="/user/:id/attention" component={LoadableUserMainContentAttention} />
          </Tabs.TabPane>
        </Tabs>
      </ContentMain>
    </ContentContainer>
  );

});


export default withRouter(UserMainContent || null);