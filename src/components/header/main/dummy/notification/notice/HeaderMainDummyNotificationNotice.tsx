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
  NOTIFICATION_MAKE_FRIEND_REQUEST,
  NOTIFICATION_MAKE_FRIEND_AGREE,
  NOTIFICATION_MAKE_FRIEND_REFUSE,
  NOTIFICATION_TYPE,
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
// ? 用户拒绝好友申请
const PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE = 'PRIVATE_UPDATE_MAKE_FRIEND_REFUSE_AGREE_STATE';


export interface IHeaderMainDummyNotificationNoticeProps extends RouteComponentProps { };
export interface IHeaderMainDummyNotificationNoticeState {
  // ? 用户通知相关socket
  notificationUserIOClient: SocketIOClient.Socket;

  // ? 通知项列表
  notificationsList: React.ReactNode[];
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
      case NOTIFICATION_MAKE_FRIEND_AGREE: {
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
      case NOTIFICATION_MAKE_FRIEND_REFUSE: {
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
    notificationUserIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user`, {
      reconnectionAttempts: 2,
    }),
    notificationUnreadTotal: 0,
    notificationsList: [],
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
      data: IBaseNotificationUserFriendAgreeParams & {
        notificationId: string,
      },
    ) => {
      const currentUserId = localStorage.getItem('userid');

      // 更新接收方的状态
      if (data.to._id === currentUserId) {
        dispatch({
          type: NOTIFICATION_MAKE_FRIEND_AGREE,
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
    state.notificationUserIOClient.on('receiveMakeFriendRefuse', (
      data: IBaseNotificationUserFriendRefuseParams & {
        notificationId: string,
      },
    ) => {
      const currentUserId = localStorage.getItem('userid');

      // 更新接收方的状态
      if (data.to._id === currentUserId) {
        dispatch({
          type: NOTIFICATION_MAKE_FRIEND_REFUSE,
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
  }, []);

  /**
   * [初始化] - 通知框的内容
   */
  function _initNotificationContent() {
    const notificationNodeList= state.notificationsList.map((value: React.FunctionComponentElement<any>, index) => {
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
          {notificationNodeList}
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