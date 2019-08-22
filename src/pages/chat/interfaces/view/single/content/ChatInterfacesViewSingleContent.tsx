import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  withRouter,
  RouteComponentProps,
  match,
} from 'react-router-dom';
import {
  notification,
} from 'antd';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import { formatTime } from 'utils/utils';
import {
  PAGE_SIZE,
} from 'constants/constants';
import { query } from 'services/request';
import BaseChatMessage from 'components/widget/base_chat_message/BaseChatMessage';


export interface IChatInterfacesViewSingleContentProps extends RouteComponentProps {
  match: match<{
    // ? 单聊唯一标识id
    id: string;
  }>;

  // ? 单聊消息列表
  singleChatMessage: IStaticChatSingleMessageParams[];
};
export interface IChatInterfacesViewSingleContentState {
  // ? 单聊消息列表
  // * 为了方便分页, 将其存储为state
  // * props.singleChatMessage只获取首屏单聊消息
  singleChatMessage: IStaticChatSingleMessageParams[];

  // ? 是否还有更多消息
  hasMoreMessage: boolean;
};
// ? 单聊消息格式
export interface IStaticChatSingleMessageParams {
  _id: string;
  chat_id: string;
  from_member_id: {
    _id: string,
    user_id: {
      _id: string,
      useravatar: string,
      username: string,
    },
  },
  to_member_id: {
    _id: string,
    user_id: {
      _id: string,
      useravatar: string,
      username: string,
    },
  },
  content_type: string;
  content: string;
  create_time: number;
  update_time: number;
};


const ChatInterfacesViewSingleContent = React.memo((props: IChatInterfacesViewSingleContentProps) => {
  const $scrollWrapper = React.useRef(null);

  const [state, setState] = React.useState<IChatInterfacesViewSingleContentState>({
    singleChatMessage: [],
    hasMoreMessage: true,
  });

  React.useEffect(() => {
    _setScrollWrapperToAffixBottom();
  }, [props.singleChatMessage]);

  React.useEffect(() => {
    setState({
      ...state,
      singleChatMessage: props.singleChatMessage,
    });
  }, [props.singleChatMessage]);

  /**
   * [初始化] - 单聊消息列表
   */
  function _initMessageList() {
    const { singleChatMessage } = state;
    const userId = localStorage.getItem('userid');

    if (singleChatMessage.length) {
      return singleChatMessage.map((v) => {
        // 根据发送方 or 接收方初始化相关信息
        const fromMemberId = v.from_member_id._id;
        const fromUserId = v.from_member_id.user_id._id;
        const fromUserName = v.from_member_id.user_id.username;
        const fromUserAvatar = v.from_member_id.user_id.useravatar;
        const content = v.content;
        const time = formatTime(v.create_time);

        const isSend = userId === fromUserId;
        const chatMessageInfo = {
          id: fromMemberId,
          name: fromUserName,
          avatar: fromUserAvatar,
          time,
          content,
        };

        return (
          <CSSTransition
            key={v._id}
            timeout={300}
            exit={false}
            classNames={'fadeTranslateZ'}
          >
            <ContentMainItem>
              <BaseChatMessage
                isSend={isSend}
                chatMessageInfo={chatMessageInfo}
              />
            </ContentMainItem>
          </CSSTransition>
        );
      });
    }

    return [];
  }

  /**
   * [设置] - 聊天消息视图吸顶, 避免自行滚动
   */
  function _setScrollWrapperToAffixBottom() {
    if ($scrollWrapper && $scrollWrapper.current) {
      const oDiv = ($scrollWrapper.current) as unknown as HTMLDivElement;

      oDiv.scrollTop = oDiv.scrollHeight;
    }
  }

  /**
   * 分页获取单聊记录
   * @param page 当前页数
   */
  function handleLoadMore(page: number) {
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
        url: '/api/chat/info/single/message/list',
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
          singleChatMessage: single_chat_message.concat(state.singleChatMessage),
        });
      });
    }
  }

  return (
    <ContentWrapper>
      <ContentMain ref={$scrollWrapper}>
        <InfiniteScroll
          isReverse={true}
          useWindow={false}
          hasMore={state.hasMoreMessage}
          pageStart={1}
          initialLoad={false}
          loadMore={handleLoadMore}
        >
          <ContentMainList>
            <TransitionGroup>
              {_initMessageList()}
            </TransitionGroup>
          </ContentMainList>
        </InfiniteScroll>
      </ContentMain>
    </ContentWrapper>
  );
});

export default withRouter(ChatInterfacesViewSingleContent);