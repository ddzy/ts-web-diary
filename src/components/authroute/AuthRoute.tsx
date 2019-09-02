import * as React from 'react';
import * as IOClient from 'socket.io-client';
import {
  notification,
} from 'antd';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import {
  IInitialState,
  reduxHandleCheckAuth,
} from './AuthRoute.redux';
import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


export interface IAuthRouteProps extends RouteComponentProps {
  AuthRouteReducer: IInitialState;
  reduxHandleCheckAuth: (callback: () => void) => void;
};
export interface IAuthRouteState {
  statusIOClient: SocketIOClient.Socket;
};


const AuthRoute = React.memo<IAuthRouteProps>((
  props: IAuthRouteProps,
): JSX.Element => {
  const [state] = React.useState<IAuthRouteState>({
    statusIOClient: IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`),
  });

  React.useEffect(() => {
    props.reduxHandleCheckAuth(() => {
      const { isAuth } = props.AuthRouteReducer;

      // 登录凭证已过期
      if (!isAuth) {
        const userId = localStorage.getItem('userid') || '';

        if (userId) {
          // socket处理用户登出(离线)
          state.statusIOClient.emit('sendUserOffLine', {
            userId,
          });
          // socket处理重置用户处于哪个会话
          state.statusIOClient.emit('sendUserOnWhichChat', {
            userId,
            chatId: '',
          });

          // 清除用户相关信息
          localStorage.removeItem('userid');
          notification.error({
            message: '错误',
            description: 'token已失效, 请重新登录!',
          });
          props.history.push('/login');
        }
      }
    });

    return () => {
      state.statusIOClient.close();
    }
  }, []);

  return (
    <React.Fragment />
  );
});


function mapStateToProps(state: any) {
  return {
    AuthRouteReducer: state.AuthRouteReducer,
  };
}
function mapDispatchToProps() {
  return {
    reduxHandleCheckAuth,
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps(),
)(AuthRoute));