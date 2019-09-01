import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  Popover,
  Icon,
} from 'antd';

import {
  StatusWrapper,
  StatusMain,
  MainPopContent,
  MainPopContentInner,
  MainPopContentInnerList,
  MainPopContentInnerItem,
} from './style';
import StatusOnLine from './online/statusOnLine';
import { query } from 'services/request';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


export interface IStatusProps { };
export interface IStatusState {
  statusIOClient: SocketIOClient.Socket;

  // ? 在线用户各种信息
  userOnLineInfo: {
    // * 当前在线用户总数
    online_total: number,
  };
};

const Status = React.memo((props: IStatusProps) => {
  const [state, setState] = React.useState<IStatusState>({
    statusIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`),
    userOnLineInfo: {
      online_total: 0,
    },
  });

  React.useEffect(() => {
    // 首次获取各种状态信息
    _getStatusInfo();

    // socket获取实时的在线用户数量
    state.statusIOClient.on('receiveUserOnLineTotal', (userOnLineInfo: {
      online_total: number;
    }) => {
      setState({
        ...state,
        userOnLineInfo: {
          ...state.userOnLineInfo,
          online_total: userOnLineInfo.online_total,
        },
      });
    });

    return () => {
      state.statusIOClient.close();
    }
  }, []);

  /**
   * [初始化] - 气泡框内容
   */
  function _initPopoverContent() {
    return (
      <MainPopContent>
        <MainPopContentInner>
          <MainPopContentInnerList>
            {/* 应用实时在线人数 */}
            <MainPopContentInnerItem>
              <StatusOnLine
                userOnLineTotal={state.userOnLineInfo.online_total}
              />
            </MainPopContentInnerItem>
          </MainPopContentInnerList>
        </MainPopContentInner>
      </MainPopContent>
    );
  }

  /**
   * [后台] - 获取所有的站点状态信息
   */
  function _getStatusInfo() {
    query({
      method: 'GET',
      jsonp: false,
      url: '/api/status/info/all',
      data: {},
    }).then((res) => {
      const { user_online_total } = res.data;

      setState({
        ...state,
        userOnLineInfo: {
          ...state.userOnLineInfo,
          online_total: user_online_total,
        },
      });
    });
  }

  return (
    <Popover
      placement={'left'}
      mouseEnterDelay={.5}
      content={_initPopoverContent()}
    >
      <StatusWrapper>
        <StatusMain>
          <Icon
            type="bulb"
            theme="filled"
            style={{
              color: '#1da57a',
              fontSize: '22px',
            }}
            title={'站点状态'}
          />
        </StatusMain>
      </StatusWrapper>
    </Popover>
  );
});

export default Status;