import * as React from 'react';
import * as IOClient from 'socket.io-client';
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
  NOTIFICATION_MAKE_FRIEND_REQUEST,
  NOTIFICATION_MAKE_FRIEND_AGREE,
  NOTIFICATION_MAKE_FRIEND_REFUSE,
} from 'constants/constants';
import HeaderMainDummyNotificationNoticeFriendRequest from './friend/request/HeaderMainDummyNotificationNoticeFriendRequest';
import HeaderMainDummyNotificationNoticeFriendAgree from './friend/agree/HeaderMainDummyNotificationNoticeFriendAgree';
import HeaderMainDummyNotificationNoticeFriendRefuse from './friend/refuse/HeaderMainDummyNotificationNoticeFriendRefuse';
import { query } from 'services/request';
import { formatTime } from 'utils/utils';
import {
  IBaseNoficationUserFriendRequestParams,
  IBaseNotificationUserFriendAgreeParams,
  IBaseNotificationUserFriendRefuseParams,
} from 'components/header/Header.types';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


// ? 追加通知列表
const PRIVATE_CONCAT_NOTIFICATION_LIST = 'PRIVATE_CONCAT_NOTIFICATION_LIST';
// ? 重置未读通知数量
const PRIVATE_RESET_UNREAD_TOTAL = 'PRIVATE_RESET_UNREAD_TOTAL';


export interface IHeaderMainDummyNotificationNoticeProps extends RouteComponentProps { };
export interface IHeaderMainDummyNotificationNoticeState {
  // ? 用户通知相关socket
  notificationUserIOClient: SocketIOClient.Socket;

  // ? 通知项列表
  notificationList: React.ReactNode[];
  // ? 通知项的未读数量
  // * 只是个假想值, 并没有作用户的状态处理
  notificationUnreadTotal: number;
};


const HeaderMainDummyNotificationNotice = React.memo<IHeaderMainDummyNotificationNoticeProps>((
  props: IHeaderMainDummyNotificationNoticeProps,
): JSX.Element => {
  const [state, dispatch] = React.useReducer<React.Reducer<IHeaderMainDummyNotificationNoticeState, {
    type: string,
    payload: any,
  }>>((prevState, action) => {
    switch (action.type) {
      case NOTIFICATION_MAKE_FRIEND_REQUEST: {
        return {
          ...prevState,
          notificationList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeFriendRequest,
              {
                notificationInfo: action.payload,
              },
            ),
            ...prevState.notificationList
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_MAKE_FRIEND_AGREE: {
        return {
          ...prevState,
          notificationList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeFriendAgree,
              {
                notificationInfo: action.payload
              },
            ),
            ...prevState.notificationList
          ],
          notificationUnreadTotal: prevState.notificationUnreadTotal + 1,
        };
      };
      case NOTIFICATION_MAKE_FRIEND_REFUSE: {
        return {
          ...prevState,
          notificationList: [
            React.createElement(
              HeaderMainDummyNotificationNoticeFriendRefuse,
              {
                notificationInfo: action.payload
              },
            ),
            ...prevState.notificationList
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
          notificationList: prevState.notificationList.concat(action.payload),
        };
      };
      default: {
        return prevState;
      };
    }
  }, {
    notificationUserIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user`, {
      reconnectionAttempts: 2,
    }),
    notificationList: [],
    notificationUnreadTotal: 0,
  });

  React.useEffect(() => {
    // ? 获取首屏的通知列表
    _getNotificationList();

    // ? 用户请求加好友时的通知socket
    state.notificationUserIOClient.on('receiveMakeFriendRequest', (
      data: IBaseNoficationUserFriendRequestParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.to._id) {
        dispatch({
          type: NOTIFICATION_MAKE_FRIEND_REQUEST,
          payload: data,
        });
      }
    });

    // ? 用户被成功加为好友时的通知socket
    state.notificationUserIOClient.on('receiveMakeFriendAgree', (
      data: IBaseNotificationUserFriendAgreeParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (data.to._id === currentUserId) {
        dispatch({
          type: NOTIFICATION_MAKE_FRIEND_AGREE,
          payload: data,
        });
      }
    });

    // ? 用户被拒绝加好友时的通知socket
    state.notificationUserIOClient.on('receiveMakeFriendRefuse', (
      data: IBaseNotificationUserFriendRefuseParams,
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (data.to._id === currentUserId) {
        dispatch({
          type: NOTIFICATION_MAKE_FRIEND_REFUSE,
          payload: data,
        });
      }
    });

    // ! 火狐中会报错, Chrome和IE正常
    // return () => {
    //   state.notificationUserIOClient.close();
    // };
  }, []);

  /**
   * [初始化] - 通知框的内容
   */
  function _initNotificationContent() {
    const notificationItem = state.notificationList.map((value: React.FunctionComponentElement<any>, index) => {
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
      <MainContent>
        <MainContentList>
          {notificationItem}
        </MainContentList>
      </MainContent>
    );
  }

  /**
   * [获取] - 后台获取首屏的通知列表
   */
  function _getNotificationList() {
    const userId = localStorage.getItem('userid');

    if (!userId || typeof userId !== 'string') {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login')
    }

    query({
      method: 'GET',
      jsonp: false,
      url: '/api/notification/user/info/list',
      data: {
        userId,
      },
    }).then((res) => {
      const {
        user_friend_request_notification_list,
        user_friend_agree_notification_list,
        user_friend_refuse_notification_list,
      } = res.data;

      const processedFriendRequestNotificationList = user_friend_request_notification_list.map((v: IBaseNoficationUserFriendRequestParams) => {
        return React.createElement(
          HeaderMainDummyNotificationNoticeFriendRequest,
          {
            notificationInfo: v,
          },
        );
      });

      const processedFriendAgreeNotificationList = user_friend_agree_notification_list.map((v: IBaseNotificationUserFriendAgreeParams) => {
        return React.createElement(
          HeaderMainDummyNotificationNoticeFriendAgree,
          {
            notificationInfo: v,
          },
        );
      });

      const processedFriendRefuseNotificationList = user_friend_refuse_notification_list.map((v: IBaseNotificationUserFriendRefuseParams) => {
        return React.createElement(
          HeaderMainDummyNotificationNoticeFriendRefuse,
          {
            notificationInfo: v,
          },
        );
      });

      const composedFriendNotificationList = [
        ...processedFriendRequestNotificationList,
        ...processedFriendAgreeNotificationList,
        ...processedFriendRefuseNotificationList,
      ];

      // 按时间排序
      composedFriendNotificationList.sort((a, b) => {
        return b.props.create_time - a.props.create_time;
      });

      // 追加至通知列表
      dispatch({
        type: PRIVATE_CONCAT_NOTIFICATION_LIST,
        payload: composedFriendNotificationList,
      });
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

  return (
    <NoticeWrapper>
      <NoticeMain>
        <Popover
          trigger="click"
          placement="bottom"
          arrowPointAtCenter={true}
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