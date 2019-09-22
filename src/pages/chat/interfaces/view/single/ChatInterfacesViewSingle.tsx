import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';
import {
  notification,
  Spin,
  Icon,
} from 'antd';

import {
  SingleWrapper,
  SingleMain,
} from './style';
import ChatInterfacesViewSingleTitle from './title/ChatInterfacesViewSingleTitle';
import ChatInterfacesViewSingleContent from './content/ChatInterfacesViewSingleContent';
import ChatInterfacesViewSingleAction from './action/ChatInterfacesViewSingleAction';
import { query } from 'services/request';
import {
  PAGE_SIZE,
} from 'constants/constants';
import {
  IBaseCommonChatMessgaeType,
} from 'pages/chat/Chat.types';
import {
  chatSingleIOClient,
  statusIOClient,
} from 'services/websocket';


export interface IChatInterfacesViewSingleProps extends RouteComponentProps {
  match: match<{
    // ? 单聊唯一标识
    id: string,
  }>;
};
type IChatInterfacesViewSingleState = typeof initialState;


const chatIOClient = chatSingleIOClient;

const initialState = {
  // ? 单聊信息
  singleChatInfo: {
    from_member_id: {
      _id: '',
      chat_id: '',
      user_id: {
        _id: '',
        username: '',
      },
    },
    to_member_id: {
      _id: '',
      chat_id: '',
      user_id: {
        _id: '',
        username: '',
      },
    },
    message: [],
  },
  // ? 整体loading状态
  // * 只在第一次获取数据时有效
  loading: false,
  // ? 消息列表分页——是否还有更多消息
  hasMoreMessage: true,
  // ? 消息列表分页——修复聊天记录吸顶bug
  isMessageSend: false,
};


const ChatInterfacesViewSingle = React.memo((props: IChatInterfacesViewSingleProps) => {
  const [state, setState] = React.useState<IChatInterfacesViewSingleState>(initialState);

  React.useEffect(() => {
    _setSingleChatMessageInfo();
  });

  React.useEffect(() => {
    return () => {
      // * socket处理用户正处于哪个会话状态
      // 单聊组件`componentWillUnmount`之后, 需要进行一次重置
      // 避免上一次的会话状态遗留
      statusIOClient.emit('sendUserOnWhichChat', {
        userId: localStorage.getItem('userid') || '',
        chatId: '',
      });
    }
  }, []);

  React.useEffect(() => {
    setState({
      ...state,
      loading: true,
      hasMoreMessage: true,
    });

    // * 获取单聊信息
    _getSingleChatMessageInfo();

    // * socket处理发送用户处于会话状态
    // ? 正处于哪个会话
    statusIOClient.emit('sendUserOnWhichChat', {
      userId: localStorage.getItem('userid') || '',
      chatId: props.match.params.id || '',
    });
  }, [props.match.params.id]);

  /**
   * [后台] - 获取单聊信息
   */
  function _getSingleChatMessageInfo() {
    const userId = localStorage.getItem('userid');
    const chatId = props.match.params.id;
    const chatType = 'single';

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '登录凭证已过期, 请重新登录!',
      });

      props.history.push('/login');
    } else {
      if (!chatId || typeof chatId !== 'string') {
        notification.error({
          message: '错误',
          description: '聊天凭证无效, 请重新发起单聊',
        });

        props.history.push('/chat/friends');
      } else {
        query({
          url: '/api/chat/single/info',
          method: 'GET',
          jsonp: false,
          data: {
            userId,
            chatId,
            chatType,
            pageSize: PAGE_SIZE,
            page: 1,
          },
        }).then((res) => {
          const { singleChatInfo } = res.data;

          setState({
            ...state,
            singleChatInfo,
            loading: false,
          });

          // socket处理同步重置聊天历史列表单个条目未读消息总数为0
          chatIOClient.emit('sendResetChatMemoryItemUnreadMessageTotal', {
            chatId,
            userId,
          });
        });
      }
    }
  }

  /**
   * [更新] - 单聊信息
   */
  function _setSingleChatMessageInfo() {
    // ? 先移除所有的监听器, 避免出现指数增长的情况
    chatIOClient.removeAllListeners();

    // * socket处理接收聊天信息
    // ? 不能在componentDidMount时监听, 只会监听一个聊天会话
    chatIOClient.on('receiveChatSingleMessage', (message: any) => {
      // 过滤当前chatId的会话消息
      const chatId = props.match.params.id;
      const newMessage = message.chat_id === chatId
        ? state.singleChatInfo.message.concat(message)
        : state.singleChatInfo.message;

      setState({
        ...state,
        singleChatInfo: {
          ...state.singleChatInfo,
          message: newMessage,
        },
        isMessageSend: true,
      });
    });
  }

  /**
   * [处理] - 发送聊天消息
   */
  function handleChatMessageSend(
    messageInfo: {
      type: IBaseCommonChatMessgaeType,
      content: string,
    },
    callback?: () => void,
  ) {
    // TODO 组装聊天消息
    const chatId = props.match.params.id;
    const chatType = 'single';
    const fromUserId = state.singleChatInfo.from_member_id.user_id._id;
    const toUserId = state.singleChatInfo.to_member_id.user_id._id;
    const fromMemberId = state.singleChatInfo.from_member_id._id;
    const toMemberId = state.singleChatInfo.to_member_id._id;
    const contentType = messageInfo.type;
    const content = messageInfo.content;

    const userId = localStorage.getItem('userid');
    const newFromUserId = userId === fromUserId
      ? fromUserId
      : userId === toUserId
        ? toUserId
        : '';
    const newToUserId = userId === fromUserId
      ? toUserId
      : userId === toUserId
        ? fromUserId
        : '';
    const newFromMemberId = userId === fromUserId
      ? fromMemberId
      : userId === toUserId
        ? toMemberId
        : '';
    const newToMemberId = userId === fromUserId
      ? toMemberId
      : userId === toUserId
        ? fromMemberId
        : '';

    // socket发送单聊消息
    chatIOClient.emit('sendChatSingleMessage', {
      chatId,
      chatType,
      fromUserId: newFromUserId,
      toUserId: newToUserId,
      fromMemberId: newFromMemberId,
      toMemberId: newToMemberId,
      contentType,
      content,
    });

    callback && callback();

    setState({
      ...state,
      isMessageSend: false,
    });
  }

  /**
   * [处理] - 单聊消息分页
   * @param page 当前页数
   * @description 由`子组件`自行管理单聊消息列表并进行分页处理, 会出现无法吸顶的BUG, 已尝试
   * 无法修复, 故移至父级管理, 并使用`isMessageSend`来通知子组件进行吸顶
   */
  function handleChatMessageLoadMore(page: number) {
    const userId = localStorage.getItem('userid');
    const chatId = props.match.params.id;

    if (!userId || typeof userId !== 'string') {
      props.history.push('/login');

      notification.error({
        message: '错误',
        description: 'token已过期, 请重新登录!',
      });
    } else {
      query({
        jsonp: false,
        method: 'GET',
        url: '/api/chat/single/info/message/list',
        data: {
          userId,
          chatId,
          pageSize: PAGE_SIZE,
          page,
        },
      }).then((res) => {
        const { single_chat_message } = res.data;

        setState({
          ...state,
          hasMoreMessage: single_chat_message.length !== 0,
          singleChatInfo: {
            ...state.singleChatInfo,
            message: single_chat_message.concat(state.singleChatInfo.message),
          },
        });
      });
    }
  }

  return (
    <SingleWrapper>
      <SingleMain>
        {/* 顶部标题栏 */}
        <ChatInterfacesViewSingleTitle singleChatInfo={state.singleChatInfo as any} />

        {/* 中部消息栏 */}
        <Spin
          size={'large'}
          indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
          spinning={state.loading}
        >
          <ChatInterfacesViewSingleContent
            singleChatMessage={state.singleChatInfo.message}
            isMessageSend={state.isMessageSend}
            hasMoreMessage={state.hasMoreMessage}
            onLoadMore={handleChatMessageLoadMore}
          />
        </Spin>

        {/* 底部操作栏 */}
        <ChatInterfacesViewSingleAction
          onChatMessageSend={handleChatMessageSend}
        />
      </SingleMain>
    </SingleWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingle);