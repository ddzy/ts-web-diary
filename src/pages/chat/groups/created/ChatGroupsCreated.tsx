import * as React from 'react';
import {
  Table,
  Divider,
  Button,
  Avatar,
  Popconfirm,
  Drawer,
} from 'antd';

import {
  CreatedWrapper,
  CreatedMain,
  CreatedMainTitle,
  CreatedMainTitleInner,
} from './style';
import ChatGroupsCreatedAdd from './add/ChatGroupsCreatedAdd';


export interface IChatGroupsCreatedProps { };
export interface IChatGroupsCreatedState {
  isShowAddDrawer: boolean;
};

const ChatGroupsCreated = React.memo((props: IChatGroupsCreatedProps) => {
  const columns = [
    {
      title: '群聊头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: any) => (
        <Avatar icon="user" size="large" />
      ),
    },
    {
      title: '群聊名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '群聊人数',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <React.Fragment>
          <Popconfirm
            title={'确认要进入该群聊吗?'}
          >
            <Button type="primary">进入群聊</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Popconfirm
            title={'确认要移除该群聊吗?'}
          >
            <Button type="danger">移除群聊</Button>
          </Popconfirm>
        </React.Fragment>
      ),
    },
  ];
  const dataSource = [
    {
      key: '1',
      avatar: '',
      name: 'web前端技术交流群',
      total: 2000,
      createAt: '2019/7/24 14:20',
    },
    {
      key: '2',
      avatar: '',
      name: 'JS-FRONTEND',
      total: 1500,
      createAt: '2019/7/24 14:20',
    },
    {
      key: '3',
      avatar: '',
      name: 'web前端小白',
      total: 320,
      createAt: '2019/7/24 14:20',
    },
    {
      key: '4',
      avatar: '',
      name: '前端技术交流群',
      total: 199,
      createAt: '2019/7/24 14:20',
    },
    {
      key: '5',
      avatar: '',
      name: 'vscode/git主群',
      total: 4988,
      createAt: '2019/7/24 14:20',
    },
    {
      key: '6',
      avatar: '',
      name: '我叫群名称',
      total: 30,
      createAt: '2019/7/24 14:20',
    },
  ];

  const [state, setState] = React.useState<IChatGroupsCreatedState>({
    isShowAddDrawer: false,
  });

  /**
   * 处理 - 显示创建群聊弹窗
   */
  function handleShowAddDrawer() {
    setState({
      ...state,
      isShowAddDrawer: true,
    });
  }

  /**
   * 处理 - 隐藏创建群聊弹窗
   */
  function handleHideAddDrawer() {
    setState({
      ...state,
      isShowAddDrawer: false,
    });
  }

  /**
   * 处理 - 提交创建群聊的表单
   * @param value 群聊信息
   */
  function handleSubmitAddDrawer(
    value: {
      groupName: string,
      groupDescription: string,
    },
  ) {
    console.log(value);
  }

  return (
    <CreatedWrapper>
      <CreatedMain>
        <Table
          bordered
          title={() => (
            <CreatedMainTitle>
              <CreatedMainTitleInner>
                <Button
                  type="primary"
                  onClick={handleShowAddDrawer}
                >创建新的群聊</Button>
              </CreatedMainTitleInner>
            </CreatedMainTitle>
          )}
          pagination={{
            defaultPageSize: 5,
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
            onHideAddDrawer={handleHideAddDrawer}
            onSubmitAddDrawer={handleSubmitAddDrawer}
          />
        </Drawer>
      </CreatedMain>
    </CreatedWrapper>
  );
});

export default ChatGroupsCreated;