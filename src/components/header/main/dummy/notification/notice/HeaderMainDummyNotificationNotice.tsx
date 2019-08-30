import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  Icon,
  Badge,
  Popover,
  Divider,
} from 'antd';

import {
  NoticeWrapper,
  NoticeMain,
  MainContent,
  MainContentList,
  MainContentItem,
} from './style';
import {
  NOTIFICATION_MAKE_FRIEND_REQUEST,
} from 'constants/constants';
import HeaderMainDummyNotificationNoticeFriendRequest from './friend/request/HeaderMainDummyNotificationNoticeFriendRequest';


export interface IHeaderMainDummyNotificationNoticeProps { };
export interface IHeaderMainDummyNotificationNoticeState {
  // ? 用户通知相关socket
  notificationUserIOClient: SocketIOClient.Socket;

  // ? 通知项列表
  notificationList: React.ReactNode[];
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
        };
      };
      default: {
        return prevState;
      };
    }
  }, {
    notificationUserIOClient: IOClient('ws://localhost:8888/notification/user', {
      reconnectionAttempts: 2,
    }),
    notificationList: [],
  });

  /**
   * [初始化] - 通知框的内容
   */
  function _initNotificationContent() {
    const notificationItem = state.notificationList.map((value, index) => {
      return (
        <React.Fragment key={index}>
          <MainContentItem>
            {value}
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

  React.useEffect(() => {
    // ? 用户请求加好友时的通知socket
    state.notificationUserIOClient.on('receiveMakeFriendRequest', (
      data: {
        to_user_id: string,
        from_user_id: string,
        from_user_name: string,
        description: string,
      },
    ) => {
      const currentUserId = localStorage.getItem('userid');

      if (currentUserId === data.to_user_id) {
        dispatch({
          type: NOTIFICATION_MAKE_FRIEND_REQUEST,
          payload: data,
        });
      }
    });

    // ? 用户被成功加为好友时的通知socket

    // ? 用户被拒绝加好友时的通知socket

    return () => {
      state.notificationUserIOClient.close();
    };
  }, []);

  return (
    <NoticeWrapper>
      <NoticeMain>
        <Popover
          trigger="click"
          placement="bottom"
          arrowPointAtCenter={true}
          title={'通知'}
          content={_initNotificationContent()}
        >
          <Badge
            dot={true}
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


export default HeaderMainDummyNotificationNotice;