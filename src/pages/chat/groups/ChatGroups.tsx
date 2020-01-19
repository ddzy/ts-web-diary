import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  Route,
  withRouter,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Tabs,
} from 'antd';

import {
  GroupsWrapper,
  GroupsMain,
} from './style';

const LoadableChatGroupsJoined = Loadable({
  loader: () => import('./joined/ChatGroupsJoined'),
  loading: () => null,
});
const LoadableChatGroupsCreated = Loadable({
  loader: () => import('./created/ChatGroupsCreated'),
  loading: () => null,
});


export interface IChatGroupsProps extends RouteComponentProps { };

const ChatGroups = React.memo((props: IChatGroupsProps) => {
  /**
   * 处理tabs切换
   * @param type tabpane名称, 对应路由
   */
  function handleTabChange(type: string) {
    props.history.push(`/chat/groups/${type}`);
  }

  /**
   * 处理 - 当前页路由与tabs联调
   * [Bug]: 路由有时可能与tabs的默认展开面板不对应
   */
  function handleTabsDefaultActiveKey() {
    const basePathname = ['joined', 'created'];
    const currentPathname = props.location.pathname;
    const processedPathname = basePathname.find((v) => currentPathname.includes(v));

    return processedPathname ? processedPathname : basePathname[0];
  }

  return (
    <GroupsWrapper>
      <GroupsMain>
        <Route exact path="/chat/groups" render={() => <Redirect to="/chat/groups/joined" />} />

        <Tabs
          type="card"
          // size="large"
          onChange={handleTabChange}
          defaultActiveKey={handleTabsDefaultActiveKey()}
        >
          <Tabs.TabPane tab={'我加入的'} key="joined">
            <Route path="/chat/groups/joined" component={LoadableChatGroupsJoined} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'我创建的'} key="created">
            <Route path="/chat/groups/created" component={LoadableChatGroupsCreated} />
          </Tabs.TabPane>
        </Tabs>
      </GroupsMain>
    </GroupsWrapper>
  );
});

export default withRouter(ChatGroups);