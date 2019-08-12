import * as React from 'react';
import * as IO from 'socket.io-client';
import {
  List,
  Avatar,
  Badge,
  notification,
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

const chatSocket = IO('http://localhost:8888/chat');


export interface IChatInterfacesNavMessageProps extends RouteComponentProps { };
export interface IChatInterfacesNavMessageState {
  // ? 聊天历史列表
  chatMemoryList: IStaticChatMemoryListItem[];
};
export interface IStaticChatMemoryListItem {
  // ? 聊天类型 single | group
  chat_type: string;
  // ? 聊天唯一标识id
  // ? single状态下为自定义id, group则为自增id
  chat_id: string;
  // ? 聊天名称
  chat_name: string;
  // ? 聊天头像
  chat_avatar: string;
  // ? 最新的聊天内容
  last_message_content: string;
  // ? 最新的聊天内容类型
  last_message_content_type: string;
  // ? 最新的发言人名称
  last_message_member_name: string;
  // ? 未读消息总数
  unread_message_total: number;
};

const ChatInterfacesNavMessage = React.memo((props: IChatInterfacesNavMessageProps) => {
  const [state, setState] = React.useState<IChatInterfacesNavMessageState>({
    chatMemoryList: [],
  });

  React.useEffect(() => {
    _setChatMemoryList();
  });

  React.useEffect(() => {
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
        const { chatMemoryList } = res.data;

        setState({
          ...state,
          chatMemoryList,
        });
      });
    }
  }

  /**
   * [更新] - 聊天历史列表
   */
  function _setChatMemoryList() {
    // ? 先移除所有的监听器, 避免出现指数增长的情况
    chatSocket.removeAllListeners();

    // * 接收聊天信息
    // ? 不能在componentDidMount时监听, 那样做只会监听一个聊天会话
    chatSocket.on('updateChatMemoryItem', (
      newChatMemoryItemInfo: {
        chat_id: string;
        last_message_member_name: string;
        last_message_content_type: string;
        last_message_content: string;
      },
    ) => {
      setState({
        ...state,
        chatMemoryList: state.chatMemoryList.map((v) => {
          if (v.chat_id === newChatMemoryItemInfo.chat_id) {
            return {
              ...v,
              last_message_member_name: newChatMemoryItemInfo.last_message_member_name,
              last_message_content_type: newChatMemoryItemInfo.last_message_content_type,
              last_message_content: newChatMemoryItemInfo.last_message_content,
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
        renderItem={(item: IStaticChatMemoryListItem) => (
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
                  description={`${item.last_message_member_name}: ${item.last_message_content}` || '暂无消息记录'}
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
    <MessageWrapper>
      <MessageMain>
        {_initChatMemoryList()}
      </MessageMain>
    </MessageWrapper>
  );
});

export default withRouter(ChatInterfacesNavMessage);