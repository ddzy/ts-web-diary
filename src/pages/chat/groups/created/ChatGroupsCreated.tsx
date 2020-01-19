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
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  CreatedWrapper,
  CreatedMain,
  CreatedMainTitle,
  CreatedMainTitleInner
} from "./style";
import ChatGroupsCreatedAdd from "./add/ChatGroupsCreatedAdd";
import { getBase64 } from "utils/utils";
import { IBasicChatGroupInfo } from "pages/basic.types";
import dateFormat from "utils/dateFormat";

export interface IChatGroupsCreatedProps extends RouteComponentProps {
  createdChatGroupList: IBasicChatGroupInfo[]; // 我创建的群聊列表

  onCreateNewChatGroup: (
    data: {
      groupName: string;
      groupAvatar: string;
      groupDescription: string;
    },
    callback: () => void
  ) => void;
}
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
  const [state, setState] = React.useState<IChatGroupsCreatedState>({
    isShowAddDrawer: false,
    groupInfo: {
      name: "",
      avatar: "",
      description: ""
    }
  });

  /**
   * @description 初始化表格列
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function _initTableColums() {
    return [
      {
        title: "群聊头像",
        dataIndex: "avatar",
        key: "avatar",
        render: (text: any, record: any) => (
          <Avatar icon="user" size="large" src={record.avatar} />
        )
      },
      {
        title: "群聊名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "群聊简介",
        dataIndex: "description",
        key: "description"
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
  }

  /**
   * @description 初始化表格数据
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/19
   */
  function _initTableDataSource() {
    const groupList = props.createdChatGroupList;

    return groupList.map(v => {
      return {
        key: v._id,
        avatar: v.avatar,
        name: v.name,
        description: v.description,
        total: v.member_total,
        createAt: dateFormat('yyyy-MM-dd HH-mm-ss', v.create_time, {}),
      };
    });
  }

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
    props.onCreateNewChatGroup(value, () => {
      handleHideAddDrawer();
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
          columns={_initTableColums()}
          dataSource={_initTableDataSource()}
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
