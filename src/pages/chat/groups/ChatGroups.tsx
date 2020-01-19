import * as React from "react";
import * as Loadable from "react-loadable";
import {
  Route,
  withRouter,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import { Tabs, message } from "antd";

import { GroupsWrapper, GroupsMain } from "./style";
import { query } from "services/request";
import { IBasicChatGroupInfo } from "pages/basic.types";

const LoadableChatGroupsJoined = Loadable({
  loader: () => import("./joined/ChatGroupsJoined"),
  loading: () => null
});
const LoadableChatGroupsCreated = Loadable({
  loader: () => import("./created/ChatGroupsCreated"),
  loading: () => null
});

export interface IChatGroupsProps extends RouteComponentProps {}
export interface IChatGroupsState {
  createdChatGroupList: IBasicChatGroupInfo[]; // 我创建的群聊列表
  joinedChatGroupList: IBasicChatGroupInfo[]; // 我加入的群聊列表
}

const ChatGroups = React.memo((props: IChatGroupsProps) => {
  const [state, setState] = React.useState<IChatGroupsState>({
    createdChatGroupList: [],
    joinedChatGroupList: []
  });

  React.useEffect(() => {
    _getChatGroupListFromServer();
  }, []);

  /**
   * @description 从后台获取群聊列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function _getChatGroupListFromServer() {
    const userId = localStorage.getItem("userid");

    if (!userId) {
      message.error("用户不存在, 请重新登录!");

      return props.history.push("/login");
    }

    query({
      url: "/api/chat/group/info/list",
      method: "POST",
      jsonp: false,
      data: {
        userId
      }
    }).then(res => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const newCreatedChatGroupList = resData.createdChatGroupList;
        const newJoinedChatGroupList = resData.joinedChatGroupList;

        setState({
          ...state,
          createdChatGroupList: newCreatedChatGroupList,
          joinedChatGroupList: newJoinedChatGroupList
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * @description 处理 tabs 路由切换
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   * @param type tabpane名称, 对应路由
   */
  function handleTabChange(type: string) {
    props.history.push(`/chat/groups/${type}`);
  }

  /**
   * @description 当前页路由与tabs联调
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   * @borrows 路由有时可能与tabs的默认展开面板不对应
   */
  function handleTabsDefaultActiveKey() {
    const basePathname = ["joined", "created"];
    const currentPathname = props.location.pathname;
    const processedPathname = basePathname.find(v =>
      currentPathname.includes(v)
    );

    return processedPathname ? processedPathname : basePathname[0];
  }

  /**
   * @description 创建新的群聊
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function handleCreateNewChatGroup(
    data: {
      groupName: string;
      groupAvatar: string;
      groupDescription: string;
    },
    callback: () => void
  ) {
    const userId = localStorage.getItem("userid");

    if (!userId) {
      message.error("用户不存在, 请重新登录!");

      return props.history.push("/login");
    }

    const groupInfo = {
      name: data.groupName,
      avatar: data.groupAvatar,
      description: data.groupDescription
    };

    query({
      url: "/api/chat/group/create",
      method: "POST",
      jsonp: false,
      data: {
        userId,
        groupInfo
      }
    }).then(res => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const createdGroupInfo = resData.groupInfo;
        const newCreatedGroupList = [
          ...state.createdChatGroupList,
          createdGroupInfo,
        ];

        setState({
          ...state,
          createdChatGroupList: newCreatedGroupList,
        });

        callback && callback();

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <GroupsWrapper>
      <GroupsMain>
        <Route
          exact
          path="/chat/groups"
          render={() => <Redirect to="/chat/groups/joined" />}
        />

        <Tabs
          type="card"
          // size="large"
          onChange={handleTabChange}
          defaultActiveKey={handleTabsDefaultActiveKey()}
        >
          <Tabs.TabPane tab={"我加入的"} key="joined">
            <Route
              path="/chat/groups/joined"
              component={LoadableChatGroupsJoined}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={"我创建的"} key="created">
            <Route
              path="/chat/groups/created"
              render={() => (
                <LoadableChatGroupsCreated
                  createdChatGroupList={state.createdChatGroupList}
                  onCreateNewChatGroup={handleCreateNewChatGroup}
                />
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </GroupsMain>
    </GroupsWrapper>
  );
});

export default withRouter(ChatGroups);
