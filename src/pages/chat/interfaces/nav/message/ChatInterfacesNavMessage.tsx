import * as React from 'react';
import * as IO from 'socket.io-client';
import {
  List,
  Avatar,
  Badge,
  notification,
  Spin,
  Icon,
} from 'antd';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  MessageWrapper,
  MessageMain,
  MessageMainItem,
  MessageMainItemInner,
} from './style';
import { query } from 'services/request';
import {
  formatChatMemoryContent,
} from 'utils/utils';
import {
  IBaseCommonChatMessgaeType,
  IBaseCommonChatMemoryInfo,
} from 'pages/chat/Chat.types';


const chatSocket = IO('ws://localhost:8888/chat');


export interface IChatInterfacesNavMessageProps extends RouteComponentProps { };
export interface IChatInterfacesNavMessageState {
  // ? 聊天历史列表
  chatMemoryList: IBaseCommonChatMemoryInfo[];
  // ? loading状态
  // * 只在首次获取数据时有效
  loading: boolean;
};


const ChatInterfacesNavMessage = React.memo((props: IChatInterfacesNavMessageProps) => {
  const [state, setState] = React.useState<IChatInterfacesNavMessageState>({
    chatMemoryList: [],
    loading: false,
  });

  React.useEffect(() => {
    _setChatMemoryList();
  });

  React.useEffect(() => {
    // loading状态
    setState({
      ...state,
      loading: true,
    });

    // 获取聊天历史列表
    _getChatMemoryList();
  }, []);

  /**
   * [后台] - 获取聊天历史列表
   */
  function _getChatMemoryList() {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录',
      });

      props.history.push('/login');
    } else {
      query({
        method: 'GET',
        url: '/api/chat/info/memory/list',
        jsonp: false,
        data: {
          userId,
        },
      }).then((res) => {
        const { chat_memory_list } = res.data;

        setState({
          ...state,
          chatMemoryList: chat_memory_list,
          loading: false,
        });
      });
    }
  }

  /**
   * [更新] - socket更新聊天历史列表相关内容
   */
  function _setChatMemoryList() {
    // ? 先移除所有的监听器, 避免出现指数增长的情况
    chatSocket.removeAllListeners();

    // * socket监听实时创建的新的单聊会话
    chatSocket.on('receiveChatMemoryCreate', (
      data: {
        from_user_id: string,
        to_user_id: string,
        chat_memory: IBaseCommonChatMemoryInfo,
      },
    ) => {
      // 由于socket的广播性
      // 需要过滤当前用户
      const currentUserId = localStorage.getItem('userid');

      if (data.to_user_id === currentUserId) {
        // 将创建的新的聊天历史追加到列表
        setState({
          ...state,
          chatMemoryList: [
            data.chat_memory,
            ...state.chatMemoryList,
          ],
        });
      }
    });

    // * 接收聊天信息
    // ? 不能在componentDidMount时监听, 那样做只会监听一个聊天会话
    chatSocket.on('receiveChatMemoryUpdate', (
      newChatMemoryItemInfo: {
        chat_id: string;
        last_message_member_name: string;
        last_message_content_type: IBaseCommonChatMessgaeType;
        last_message_content: string;

        to_user_id: string;
        to_member_id: string;
        unread_message_total: number;
      },
    ) => {
      const userId = localStorage.getItem('userid') || '';

      setState({
        ...state,
        chatMemoryList: state.chatMemoryList.map((v) => {
          if (v.chat_id === newChatMemoryItemInfo.chat_id) {
            return {
              ...v,
              last_message_member_name: newChatMemoryItemInfo.last_message_member_name,
              last_message_content_type: newChatMemoryItemInfo.last_message_content_type,
              last_message_content: newChatMemoryItemInfo.last_message_content,
              unread_message_total: newChatMemoryItemInfo.to_user_id === userId ? newChatMemoryItemInfo.unread_message_total : 0,
            };
          }

          return v;
        }),
      });
    });

    // * 重置单个单聊的未读消息数量
    chatSocket.on('receiveResetChatMemoryItemUnreadMessageTotal', (memoryInfo: {
      unread_message_total: number;
      chat_id: string;
      user_id: string;
    }) => {
      const userId = localStorage.getItem('userid');

      setState({
        ...state,
        chatMemoryList: state.chatMemoryList.map((v) => {
          if (v.chat_id === memoryInfo.chat_id && memoryInfo.user_id === userId) {
            return {
              ...v,
              unread_message_total: memoryInfo.unread_message_total,
            };
          }

          return v;
        }),
      });
    });
  }

  /**
   * [初始化] - 聊天历史列表
   */
  function _initChatMemoryList() {
    return (
      <List
        dataSource={state.chatMemoryList}
        renderItem={(item: IBaseCommonChatMemoryInfo) => (
          <MessageMainItem onClick={() => {
            handleToSingleOrGroupClick(item.chat_type, item.chat_id);
          }}>
            <MessageMainItemInner>
              <List.Item key={item.chat_id}>
                <List.Item.Meta
                  avatar={
                    <Badge count={item.unread_message_total}>
                      <Avatar src={item.chat_avatar} size="large" />
                    </Badge>
                  }
                  title={item.chat_name}
                  description={
                    `${item.last_message_member_name ? (item.last_message_member_name + ':') : ''} ${item.last_message_content ? formatChatMemoryContent(item.last_message_content_type, item.last_message_content) : '暂无消息记录'}`
                  }
                />
              </List.Item>
            </MessageMainItemInner>
          </MessageMainItem>
        )}
      />
    );
  }

  /**
   * [处理] - 右侧view界面跳转至单聊(single)或群聊(group)
   * @param type 聊天类型(single | gorup)
   * @param chatId 聊天唯一标识
   * @todo 为了方便日后拓展, 故将single和group完全分为两个独立路由
   */
  function handleToSingleOrGroupClick(
    type: string,
    chatId: string,
  ) {
    props.history.push(`/chat/interfaces/${type}/${chatId}`);
  }

  return (
    <Spin
      size={'large'}
      indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
      spinning={state.loading}
    >
      <MessageWrapper>
        <MessageMain>
          {_initChatMemoryList()}
        </MessageMain>
      </MessageWrapper>
    </Spin>
  );
});

export default withRouter(ChatInterfacesNavMessage);