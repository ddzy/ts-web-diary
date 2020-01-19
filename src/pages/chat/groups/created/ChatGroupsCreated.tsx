import * as React from "react";
import {
  Table,
  Divider,
  Button,
  Avatar,
  Popconfirm,
  Drawer,
  message
} from "antd";
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  CreatedWrapper,
  CreatedMain,
  CreatedMainTitle,
  CreatedMainTitleInner
} from "./style";
import ChatGroupsCreatedAdd from "./add/ChatGroupsCreatedAdd";
import { getBase64 } from "utils/utils";
import { query } from "services/request";

export interface IChatGroupsCreatedProps extends RouteComponentProps {}
export interface IChatGroupsCreatedState {
  isShowAddDrawer: boolean; // 创建群聊弹窗的状态

  groupInfo: {
    // 新创建的群聊信息
    name: string; // 群聊名称
    avatar: string; // 群聊头像
    description: string; // 群聊描述
  };
}

const ChatGroupsCreated = React.memo((props: IChatGroupsCreatedProps) => {
  const columns = [
    {
      title: "群聊头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: any) => <Avatar icon="user" size="large" />
    },
    {
      title: "群聊名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "群聊人数",
      dataIndex: "total",
      key: "total"
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      key: "createAt"
    },
    {
      title: "操作",
      key: "action",
      render: (text: any, record: any) => (
        <React.Fragment>
          <Popconfirm title={"确认要进入该群聊吗?"}>
            <Button type="primary">进入群聊</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Button type="primary">邀请好友</Button>
          <Divider type="vertical" />
          <Popconfirm title={"确认要移除该群聊吗?"}>
            <Button type="danger">解散群聊</Button>
          </Popconfirm>
        </React.Fragment>
      )
    }
  ];
  const dataSource = [
    {
      key: "1",
      avatar: "",
      name: "web前端技术交流群",
      total: 2000,
      createAt: "2019/7/24 14:20"
    },
    {
      key: "2",
      avatar: "",
      name: "JS-FRONTEND",
      total: 1500,
      createAt: "2019/7/24 14:20"
    },
    {
      key: "3",
      avatar: "",
      name: "web前端小白",
      total: 320,
      createAt: "2019/7/24 14:20"
    },
    {
      key: "4",
      avatar: "",
      name: "前端技术交流群",
      total: 199,
      createAt: "2019/7/24 14:20"
    },
    {
      key: "5",
      avatar: "",
      name: "vscode/git主群",
      total: 4988,
      createAt: "2019/7/24 14:20"
    },
    {
      key: "6",
      avatar: "",
      name: "我叫群名称",
      total: 30,
      createAt: "2019/7/24 14:20"
    }
  ];

  const [state, setState] = React.useState<IChatGroupsCreatedState>({
    isShowAddDrawer: false,
    groupInfo: {
      name: "",
      avatar: "",
      description: ""
    }
  });

  /**
   * @description 显示创建群聊弹窗
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleShowAddDrawer() {
    setState({
      ...state,
      isShowAddDrawer: true
    });
  }

  /**
   * @description 隐藏创建群聊弹窗
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleHideAddDrawer() {
    setState({
      ...state,
      isShowAddDrawer: false
    });
  }

  /**
   * @description 处理创建新的群聊的表单值
   * @summary 所有的值统一由当前组件, 也就是父组件管理
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleGroupInfoFormChange(changedFields: {
    groupAvatar:
      | {
          file: File;
        }
      | string;
    groupName: string;
    groupDescription: string;
  }) {
    if (typeof changedFields.groupAvatar !== "string") {
      const img = changedFields.groupAvatar.file;

      const isJpgOrPng = img.type === "image/jpeg" || img.type === "image/png";

      if (!isJpgOrPng) {
        message.error("目前只支持上传`JPG`和`PNG`格式的图片!");

        return;
      }

      const isLt1M = img.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        message.error("目前只支持上传小于`1MB`的图片!");

        return;
      }

      getBase64(img, result => {
        setState({
          ...state,
          groupInfo: {
            ...state.groupInfo,
            avatar: result,
            name:
              changedFields.groupName === undefined
                ? ""
                : changedFields.groupName,
            description:
              changedFields.groupDescription === undefined
                ? ""
                : changedFields.groupDescription
          }
        });
      });
    } else {
      setState({
        ...state,
        groupInfo: {
          ...state.groupInfo,
          avatar: changedFields.groupAvatar,
          name:
            changedFields.groupName === undefined
              ? ""
              : changedFields.groupName,
          description:
            changedFields.groupDescription === undefined
              ? ""
              : changedFields.groupDescription
        }
      });
    }
  }

  /**
   * @description 提交创建群聊的表单
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/15
   */
  function handleSubmitAddDrawer(value: {
    groupName: string;
    groupDescription: string;
    groupAvatar: string;
  }) {
    const userId = localStorage.getItem('userid');

    if (!userId) {
      message.error('用户不存在, 请重新登录!');

      return props.history.push('/login');
    }

    const groupInfo = {
      name: value.groupName,
      avatar: value.groupAvatar,
      description: value.groupDescription,
    };

    query({
      url: '/api/chat/group/create',
      method: 'POST',
      jsonp: false,
      data: {
        userId,
        groupInfo,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      // const resData = res.data;

      if (resCode === 0) {
        handleHideAddDrawer();

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <CreatedWrapper>
      <CreatedMain>
        <Table
          bordered
          title={() => (
            <CreatedMainTitle>
              <CreatedMainTitleInner>
                <Button type="primary" onClick={handleShowAddDrawer}>
                  创建新的群聊
                </Button>
              </CreatedMainTitleInner>
            </CreatedMainTitle>
          )}
          pagination={{
            defaultPageSize: 5
          }}
          columns={columns}
          dataSource={dataSource}
        />

        {/* 创建群聊弹窗 */}
        <Drawer
          title="创建新的群聊"
          destroyOnClose
          width={500}
          visible={state.isShowAddDrawer}
          onClose={handleHideAddDrawer}
        >
          <ChatGroupsCreatedAdd
            groupInfo={state.groupInfo}
            onHideAddDrawer={handleHideAddDrawer}
            onGroupInfoFormChange={handleGroupInfoFormChange}
            onSubmitAddDrawer={handleSubmitAddDrawer}
          />
        </Drawer>
      </CreatedMain>
    </CreatedWrapper>
  );
});

export default withRouter(ChatGroupsCreated);