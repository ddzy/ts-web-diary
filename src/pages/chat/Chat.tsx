import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  Route,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import {
  Tabs,
  Button,
} from 'antd';

import {
  ChatWrapper,
  ChatMain,
  ChatMainContent,
} from './style';

const LoadableChatInterfaces = Loadable({
  loader: () => import('./interfaces/ChatInterfaces'),
  loading: () => null,
});
const LoadableChatFriends = Loadable({
  loader: () => import('./friends/ChatFriends'),
  loading: () => null,
});
const LoadableChatGroups = Loadable({
  loader: () => import('./groups/ChatGroups'),
  loading: () => null,
});
const LoadableChatCollections = Loadable({
  loader: () => import('./collections/ChatCollections'),
  loading: () => null,
});
const LoadableChatSettings = Loadable({
  loader: () => import('./settings/ChatSettings'),
  loading: () => null,
});


export interface IChatProps extends RouteComponentProps {

};


const Chat = React.memo((props: IChatProps) => {
  /**
   * 初始化 - tab-title
   * @param type tab名称
   */
  function _initTabPaneTitle(type: string): JSX.Element {
    const categoriesDesign = {
      interfaces() {
        return (
          <Button
            type="primary"
            size="large"
            icon="message"
            ghost
          >{'聊天'}</Button>
        );
      },
      friends() {
        return (
          <Button
            type="primary"
            size="large"
            icon="user"
            ghost
          >{'好友'}</Button>
        );
      },
      groups() {
        return (
          <Button
            type="primary"
            size="large"
            icon="team"
            ghost
          >{'群聊'}</Button>
        );
      },
      collections() {
        return (
          <Button
            type="primary"
            size="large"
            icon="tags"
            ghost
          >{'收藏'}</Button>
        );
      },
      settings() {
        return (
          <Button
            type="primary"
            size="large"
            icon="setting"
            ghost
          >{'设置'}</Button>
        );
      },
    };

    return categoriesDesign[type]();
  }

  /**
   * 处理 - chat页一级路由切换
   * @param type 当前处于活跃状态的TabPane
   */
  function handleTabsChange(type: string) {
    props.history.push(`/chat/${type}`);
  }

  return (
    <ChatWrapper>
      <ChatMain>
        <ChatMainContent>
          <Route exact path="/chat" render={() => <Redirect to="/chat/interfaces" />} />

          <Tabs
            tabPosition='left'
            size={'large'}
            onChange={handleTabsChange}
          >
            <Tabs.TabPane tab={_initTabPaneTitle('interfaces')} key="interfaces">
              <Route path="/chat/interfaces" component={LoadableChatInterfaces} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={_initTabPaneTitle('friends')} key="friends">
              <Route path="/chat/friends" component={LoadableChatFriends} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={_initTabPaneTitle('groups')} key="groups">
              <Route path="/chat/groups" component={LoadableChatGroups} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={_initTabPaneTitle('collections')} key="collections">
              <Route path="/chat/collections" component={LoadableChatCollections} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={_initTabPaneTitle('settings')} key="settings">
              <Route path="/chat/settings" component={LoadableChatSettings} />
            </Tabs.TabPane>
          </Tabs>
        </ChatMainContent>
      </ChatMain>
    </ChatWrapper>
  );
});

export default Chat;