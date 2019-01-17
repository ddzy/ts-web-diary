import * as React from 'react';
import { Tabs, } from 'antd';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router-dom';
import { CSSTransition, } from 'react-transition-group';

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

  function handleTabChange(
    path: string,
  ): void {
    const userId: string = localStorage.getItem('userid') || '';
    props.history.replace(`/user/${userId}/${path}`);
  }

  return (
    <ContentContainer>
      <ContentMain>
            <Tabs
              defaultActiveKey="activity"
              size="large"
              onChange={handleTabChange}
              animated={false}
            >
              <Tabs.TabPane
                tab="动态"
                key="activity"
              >

            <CSSTransition
              key={props.location.pathname}
              classNames="fadeTranslateZ"
              timeout={500}
            >
                  <Switch location={props.location}>
                  <Route exact path="/user/:id/activity" component={(UserMainContentActivity)} />
                  <Route exact path="/user/:id/post" component={(UserMainContentPost)} />
                  <Route exact path="/user/:id/collection" component={(UserMainContentCollection)} />
                </Switch>
            </CSSTransition>
            {props.children}
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="文章"
                key="post"
              > <Switch location={props.location}>
                  <Route exact path="/user/:id/activity" component={(UserMainContentActivity)} />
                  <Route exact path="/user/:id/post" component={(UserMainContentPost)} />
                  <Route exact path="/user/:id/collection" component={(UserMainContentCollection)} />
                </Switch>
                {props.children}</Tabs.TabPane>
              <Tabs.TabPane
                tab="收藏"
                key="collection"
              >
                <Switch location={props.location}>
                  <Route exact path="/user/:id/activity" component={(UserMainContentActivity)} />
                  <Route exact path="/user/:id/post" component={(UserMainContentPost)} />
                  <Route exact path="/user/:id/collection" component={(UserMainContentCollection)} />
                </Switch>
                {props.children}
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="关注"
                key="attention"
              >
                <Switch location={props.location}>
                  <Route exact path="/user/:id/activity" component={(UserMainContentActivity)} />
                  <Route exact path="/user/:id/post" component={(UserMainContentPost)} />
                  <Route exact path="/user/:id/collection" component={(UserMainContentCollection)} />
                </Switch>
                {props.children}
              </Tabs.TabPane>
            </Tabs>
      </ContentMain>
    </ContentContainer>
  );

});


export default withRouter(UserMainContent);