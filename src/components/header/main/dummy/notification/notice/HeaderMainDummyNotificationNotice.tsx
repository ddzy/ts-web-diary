import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Icon,
  Badge,
  Popover,
  Divider,
  notification,
  message,
} from 'antd';

import {
  NoticeWrapper,
  NoticeMain,
  MainContent,
  MainContentList,
  MainContentItem,
  MainContentItemContentBox,
  MainContentItemContentInner,
  MainContentItemTimeBox,
  MainContentItemTimeInner,
} from './style';
import {
  NOTIFICATION_TYPE,
  NOTICE_PAGE_SIZE_MEDIUM,
} from 'constants/constants';
import { query } from 'services/request';
import { formatTime } from 'utils/utils';
import {
  IBaseNoficationUserFriendRequestParams,
  IBaseNotificationUserFriendAgreeParams,
  IBaseNotificationUserFriendRefuseParams,
  IBaseNotificationUserStarArticleParams,
  IBaseNotificationUserAttentionPeopleParams,
  IBaseNotificationUserStarPinParams,
  IBaseNotificationUserCollectionArticleParams,
} from 'components/header/Header.types';
import {
  notificationUserStarArticleIOClient,
  notificationUserFriendIOClient,
  notificationUserAttentionPeopleIOClient,
  notificationUserStarPinIOClient,
  notificationUserCollectionArticleIOClient,
  notificationUserChatGroupInviteIOClient,
} from 'services/websocket';
import HeaderMainDummyNotificationNoticeFriendRequest from './friend/request/HeaderMainDummyNotificationNoticeFriendRequest';
import HeaderMainDummyNotificationNoticeFriendAgree from './friend/agree/HeaderMainDummyNotificationNoticeFriendAgree';
import HeaderMainDummyNotificationNoticeFriendRefuse from './friend/refuse/HeaderMainDummyNotificationNoticeFriendRefuse';
import HeaderMainDummyNotificationNoticeStarArticle from './star/article/HeaderMainDummyNotificationNoticeStarArticle';
import HeaderMainDummyNotificationNoticeAttentionPeople from './attention/people/HeaderMainDummyNotificationNoticeAttentionPeople';
import HeaderMainDummyNotificationNoticeStarPin from './star/pin/HeaderMainDummyNotificationNoticeStarPin';
import HeaderMainNotificationNoticeCollectionArticle from './collection/article/HeaderMainNotificationNoticeCollectionArticle';
import HeaderMainDummyNotificationNoticeChatGroupInvite from './chat/group/invite/HeaderMainDummyNotificationNoticeChatGroupInvite';
import { IBasicNotificationUserChatGroupInviteInfo } from 'pages/basic.types';


// ? 追加通知列表
const PRIVATE_CONCAT_NOTIFICATION_LIST = 'PRIVATE_CONCAT_NOTIFICATION_LIST';
// ? 重置未读通知数量
const PRIVATE_RESET_UNREAD_TOTAL = 'PRIVATE_RESET_UNREAD_TOTAL';
// ? 用户拒绝or同意好友申请
const PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE = 'PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE';


export interface IHeaderMainDummyNotificationNoticeProps extends RouteComponentProps { };
export interface IHeaderMainDummyNotificationNoticeState {
  // ? 用户加好友通知相关socket
  notificationUserFriendIOClient: SocketIOClient.Socket;
  // ? 用户点赞文章通知相关socket
  notificationUserStarArticleIOClient: SocketIOClient.Socket;
  // ? 关注用户通知相关的socket
  notificationUserAttentionPeopleIOClient: SocketIOClient.Socket;
  // ? 用户点赞沸点的socket
  notificationUserStarPinIOClient: SocketIOClient.Socket;
  // ? 用户收藏文章的socket
  notificationUserCollectionArticleIOClient: SocketIOClient.Socket;
  // ? 用户被邀请加入群聊的socket
  notificationUserChatGroupInviteIOClient: SocketIOClient.Socket;

  // ? 通知项列表
  notificationsList: React.ReactNode[];
  // ? 通知项的未读数量
  // * 只是个假想值, 并没有作用户的状态处理
  notificationUnreadTotal: number;

  // ? 分页相关: 是否还有更多的通知
  hasMoreNotification: boolean;
};


const HeaderMainDummyNotificationNotice = React.memo<IHeaderMainDummyNotificationNoticeProps>((
  props: IHeaderMainDummyNotificationNoticeProps,
): JSX.Element => {
  const $scrollWrapper = React.useRef(null);

  const [state, dispatch] = React.useReducer<React.Reducer<IHeaderMainDummyNotificationNoticeState, {
    type: string,
    payload: any,
  }>>((prevState, action) => {
    switch (action.type) {
      case NOTIFICATION_TYPE.user.friend.request: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeFriendRequest,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationsList,
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.friend.agree: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeFriendAgree,
              {
                notificationInfo: action.payload
              },
            ),
            ...prevState.notificationsList
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.friend.refuse: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeFriendRefuse,
              {
                notificationInfo: action.payload
              },
            ),
            ...prevState.notificationsList
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.star.article.self: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeStarArticle,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationsList,
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.attention.people: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeAttentionPeople,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationsList,
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.star.pin.self: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeStarPin,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationsList,
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.collection.article: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainNotificationNoticeCollectionArticle,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationsList,
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_TYPE.user.chat.group.invite: {
        return {
          ...prevState,
          notificationsList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeChatGroupInvite,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationsList,
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case PRIVATE_RESET_UNREAD_TOTAL: {
        return {
          ...prevState,
          notificationUnreadTotal: action.payload.notificationUnreadTotal,
        };
      };
      case PRIVATE_CONCAT_NOTIFICATION_LIST: {
        return {
          ...prevState,
          notificationsList: prevState.notificationsList.concat(action.payload.notificationList),
          hasMoreNotification: action.payload.hasMoreNotification,
          isLoadMoreNotificationLoading: action.payload.isLoadMoreNotificationLoading,
        };
      };
      case PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE: {
        const newNotificationsList = prevState.notificationsList.map((v: React.FunctionComponentElement<any>) => {
          if (v.props.notificationInfo._id === action.payload.notificationId) {
            v.props.notificationInfo.agree_state = action.payload.agree_state;

            return v;
          }

          return v;
        });

        return {
          ...prevState,
          notificationsList: newNotificationsList,
        };
      };
      default: {
        return prevState;
      };
    }
  }, {
    notificationUserFriendIOClient,
    notificationUserStarArticleIOClient,
    notificationUserAttentionPeopleIOClient,
    notificationUserStarPinIOClient,
    notificationUserCollectionArticleIOClient,
    notificationUserChatGroupInviteIOClient,
    notificationUnreadTotal: 0,
    notificationsList: [],
    hasMoreNotification: true,
  });

  React.useEffect(() => {
    // ? 获取首屏的通知列表
    _getNotificationList({
      pageSize: NOTICE_PAGE_SIZE_MEDIUM,
    });

    // ? 用户请求加好友时的通知socket
    state.notificationUserFriendIOClient.on('receiveMakeFriendRequest', (
      data: IBaseNoficationUserFriendRequestParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.to._id) {
        dispatch({
          type: NOTIFICATION_TYPE.user.friend.request,
          payload: data,
        });
      }
    });

    // ? 用户被成功加为好友时的通知socket
    state.notificationUserFriendIOClient.on('receiveMakeFriendAgree', (
      data: IBaseNotificationUserFriendAgreeParams & {
        notificationId: string,
      },
    ) => {
      const currentUserId = localStorage.getItem('userid');

      // 更新接收方的状态
      if (data.to._id === currentUserId) {
        dispatch({
          type: NOTIFICATION_TYPE.user.friend.agree,
          payload: data,
        });
      }

      // 由于数据只获取一次, 所以需要更新发送方的request请求的agree_state
      if (data.from._id === currentUserId) {
        dispatch({
          type: PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE,
          payload: {
            notificationId: data.notificationId,
            agree_state: 1,
          },
        });
      }
    });

    // ? 用户被拒绝加好友时的通知socket
    state.notificationUserFriendIOClient.on('receiveMakeFriendRefuse', (
      data: IBaseNotificationUserFriendRefuseParams & {
        notificationId: string,
      },
    ) => {
      const currentUserId = localStorage.getItem('userid');

      // 更新接收方的状态
      if (data.to._id === currentUserId) {
        dispatch({
          type: NOTIFICATION_TYPE.user.friend.refuse,
          payload: data,
        });
      }

      // 由于数据只获取一次, 所以需要更新发送方的request请求的agree_state
      if (data.from._id === currentUserId) {
        dispatch({
          type: PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE,
          payload: {
            notificationId: data.notificationId,
            agree_state: -1,
          },
        });
      }
    });

    // ? 用户点赞文章时的通知socket
    state.notificationUserStarArticleIOClient.on('receiveUserStarArticle', (
      data: IBaseNotificationUserStarArticleParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      // 如果当前用户是文章的作者, 则显示通知
      if (currentUserId === data.article_author._id) {
        dispatch({
          type: NOTIFICATION_TYPE.user.star.article.self,
          payload: data,
        });
      }
    });

    // ? 用户关注我时的通知socket
    state.notificationUserAttentionPeopleIOClient.on('receiveUserAttentionPeople', (
      data: IBaseNotificationUserAttentionPeopleParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.to._id) {
        dispatch({
          type: NOTIFICATION_TYPE.user.attention.people,
          payload: data,
        });
      }
    });

    // ? 用户点赞我的沸点时的通知socket
    state.notificationUserStarPinIOClient.on('receiveUserStarPin', (
      data: IBaseNotificationUserStarPinParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.pin_author._id) {
        dispatch({
          type: NOTIFICATION_TYPE.user.star.pin.self,
          payload: data,
        });
      }
    });

    // ? 用户收藏我的文章时的通知socket
    state.notificationUserCollectionArticleIOClient.on('receiveUserCollectionArticle', (
      data: IBaseNotificationUserCollectionArticleParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.article_author._id) {
        dispatch({
          type: NOTIFICATION_TYPE.user.collection.article,
          payload: data,
        });
      }
    });

    // ? 用户邀请我加入群聊的通知socket
    state.notificationUserChatGroupInviteIOClient.on('receiveUserChatGroupInvite', (
      data: IBasicNotificationUserChatGroupInviteInfo
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.to._id) {
        dispatch({
          type: NOTIFICATION_TYPE.user.chat.group.invite,
          payload: data,
        });
      }
    });
  }, []);

  /**
   * @description 通知框的内容
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/20
   */
  function _initNotificationContent() {
    const notificationNodeList = state.notificationsList.map((value: React.FunctionComponentElement<any>, index) => {
      return (
        <React.Fragment key={index}>
          <MainContentItem>
            {/* 通知主内容展示区 */}
            <MainContentItemContentBox>
              <MainContentItemContentInner>
                {value}
              </MainContentItemContentInner>
            </MainContentItemContentBox>

            {/* 通知时间展示区 */}
            <MainContentItemTimeBox>
              <MainContentItemTimeInner>
                {formatTime(value.props.notificationInfo.create_time)}
              </MainContentItemTimeInner>
            </MainContentItemTimeBox>
          </MainContentItem>

          <Divider type="horizontal" />
        </React.Fragment>
      );
    });

    return (
      <MainContent ref={$scrollWrapper}>
        <InfiniteScroll
          useWindow={false}
          pageStart={1}
          initialLoad={false}
          getScrollParent={() => $scrollWrapper.current}
          hasMore={state.hasMoreNotification}
          loadMore={handleLoadMoreNotification}
        >
          <MainContentList>
            {notificationNodeList}
          </MainContentList>
        </InfiniteScroll>
      </MainContent>
    );
  }

  /**
   * @description 后台获取首屏的通知列表
   * @author ddzy<1766083035@qq.com>
   * @since 2020/1/20
   */
  function _getNotificationList(
    pagination: {
      pageSize: number,
    },
  ) {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login')
    }

    // 获取上一次分页的最后一条通知
    const notificationList = state.notificationsList;
    const notificationListLen = notificationList.length;
    const lastNotificationId = notificationListLen === 0
      ? ''
      : (((notificationList[notificationListLen - 1] as any).props) as any).notificationInfo._id

    query({
      method: 'GET',
      jsonp: false,
      url: '/api/notification/user/info/list',
      data: {
        userId,
        ...pagination,
        lastNotificationId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const {
          notification_list,
        } = resData;

        // 根据不同的通知类型, 初始化对应的通知条目
        const filteredNotificationList = notification_list.map((v: any) => {
          switch (v.type) {
            case NOTIFICATION_TYPE.user.friend.request: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeFriendRequest,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.friend.agree: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeFriendAgree,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.friend.refuse: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeFriendRefuse,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.star.article.self: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeStarArticle,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.attention.people: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeAttentionPeople,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.star.pin.self: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeStarPin,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.collection.article: {
              return React.createElement(
                HeaderMainNotificationNoticeCollectionArticle,
                {
                  notificationInfo: v,
                },
              );
            };
            case NOTIFICATION_TYPE.user.chat.group.invite: {
              return React.createElement(
                HeaderMainDummyNotificationNoticeChatGroupInvite,
                {
                  notificationInfo: v,
                },
              );
            };
            default: {
              return React.createElement('');
            };
          }
        });

        // 追加至通知列表
        dispatch({
          type: PRIVATE_CONCAT_NOTIFICATION_LIST,
          payload: {
            notificationList: filteredNotificationList,
            hasMoreNotification: filteredNotificationList.length !== 0,
          },
        });
      } else if (resCode === -1) {
        message.error(resMessage);
      } else {
        message.info(resMessage);
      }
    });
  }

  /**
   * [处理] - 通知框的显隐更新
   * @param visible 通知框是否显隐
   */
  function handleNotificationVisible(visible: boolean) {
    if (visible) {
      // 重置未读通知的数量
      dispatch({
        type: PRIVATE_RESET_UNREAD_TOTAL,
        payload: {
          notificationUnreadTotal: 0,
        },
      });
    }
  }

  /**
   * [处理] - 分页获取通知
   * @param page 当前页数
   */
  function handleLoadMoreNotification(page: number) {
    _getNotificationList({
      pageSize: NOTICE_PAGE_SIZE_MEDIUM,
    });
  }

  return (
    <NoticeWrapper>
      <NoticeMain>
        <Popover
          trigger="click"
          placement="bottom"
          arrowPointAtCenter={true}
          destroyTooltipOnHide={true}
          title={'通知'}
          content={_initNotificationContent()}
          onVisibleChange={handleNotificationVisible}
        >
          <Badge
            count={state.notificationUnreadTotal}
          >
            <Icon
              type="notification"
              theme="filled"
            />
          </Badge>
        </Popover>
      </NoticeMain>
    </NoticeWrapper>
  );
});


export default withRouter(HeaderMainDummyNotificationNotice);