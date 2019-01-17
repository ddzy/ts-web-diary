import * as React from 'react';
import { Tabs, } from 'antd';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';

import {
  ContentContainer,
  ContentMain,
} from './style';
import UserMainContentActivity from './user_main_content_activity/UserMainContentActivity';
import UserMainContentPost from './user_main_content_post/UserMainContentPost';
import UserMainContentCollection from './user_main_content_collection/UserMainContentCollection';


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
            <Route exact path="/user/:id/activity" component={() => <UserMainContentActivity />} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="文章"
            key="post"
          >
            <Route exact path="/user/:id/post" component={() => <UserMainContentPost />} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="收藏"
            key="collection"
          >
            <Route exact path="/user/:id/collection" component={() => <UserMainContentCollection />} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="关注"
            key="attention"
          >
            关注路由
          </Tabs.TabPane>
        </Tabs>
      </ContentMain>
    </ContentContainer>
  );

});


export default withRouter(UserMainContent || null);