import * as React from 'react';
import * as Loadable from 'react-loadable';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import Header from '../../components/header/Header';
import {
  AdminWrapper,
  AdminContent,
} from './style';
import BgImg from '../../static/images/admin_bg_img.png';
import { statusIOClient } from 'services/websocket';

const LoadableHome = Loadable({
  loader: () => import('pages/home/Home'),
  loading: () => null,
});
const LoadableAuthRoute = Loadable({
  loader: () => import('components/authroute/AuthRoute'),
  loading: () => null,
});
const LoadableNotFound = Loadable({
  loader: () => import('pages/404/NotFound'),
  loading: () => null,
});
const LoadableUser = Loadable({
  loader: () => import('pages/user/User'),
  loading: () => null,
});
const LoadableCollection = Loadable({
  loader: () => import('pages/collection/Collection'),
  loading: () => null,
});
const LoadableDetails = Loadable({
  loader: () => import('pages/details/Details'),
  loading: () => null,
});
const LoadablePublish = Loadable({
  loader: () => import('pages/publish/Publish') as any,
  loading: () => null,
});
const LoadableEdit = Loadable({
  loader: () => import('pages/edit/Edit'),
  loading: () => null,
});
const LoadableChat = Loadable({
  loader: () => import('pages/chat/Chat'),
  loading: () => null,
});
const LoadableStatus = Loadable({
  loader: () => import('components/status/Status'),
  loading: () => null,
});
const LoadableSettings = Loadable({
  loader: () => import('pages/settings/Settings'),
  loading: () => null,
});
const LoadablePin = Loadable({
  loader: () => import('pages/pin/Pin'),
  loading: () => null,
});
const LoadableTopic = Loadable({
  loader: () => import('pages/topic/Topic'),
  loading: () => null,
});


export interface IAdminProps extends RouteComponentProps {
};
interface IAdminState {
  // ? 用户状态相关的Websocket
  statusIOClient: SocketIOClient.Socket;

  pathname: string;
}

class Admin extends React.Component<IAdminProps, IAdminState> {
  public static getDerivedStateFromProps(
    nextProps: IAdminProps,
    prevState: IAdminState,
  ): IAdminState {
    return {
      ...prevState,
      pathname: nextProps.location.pathname,
    };
  }

  public $adminContentRef = React.createRef<HTMLDivElement>();
  public beginTime: number = 0;
  public differTime: number = 0;


  public readonly state: IAdminState = {
    pathname: '',
    statusIOClient,
  }

  public componentDidMount(): void {
    const oAdminContentUnknown = this.$adminContentRef.current;

    if (oAdminContentUnknown) {
      const oAdminContentDOM = oAdminContentUnknown as HTMLDivElement;

      oAdminContentDOM.addEventListener('wheel', this.handleMouseWheel);
    }

    window.addEventListener('unload', this.handleResetUserStatus);
    window.addEventListener('beforeunload', this.handleWindowBeforeUnload);
  }

  public componentWillUnmount(): void {
    const oAdminContentUnknown = this.$adminContentRef.current;

    if (oAdminContentUnknown) {
      const oAdminContentDOM = oAdminContentUnknown as HTMLDivElement;

      oAdminContentDOM.removeEventListener('wheel', this.handleMouseWheel);
    }

    window.removeEventListener('unload', this.handleResetUserStatus);
    window.removeEventListener('beforeunload', this.handleWindowBeforeUnload);
  }

  public shouldComponentUpdate(
    nextProps: IAdminProps,
  ): boolean {
    const currentPathname = this.state.pathname;
    const nextPathname = nextProps.location.pathname;

    return nextPathname !== currentPathname;
  }

  public handleMouseWheel(
    e: WheelEvent,
  ): void {
    const nDeltaY = e.deltaY as number;
    const oHeaderContainer = document
      .querySelector('#header-main-container') as HTMLDivElement;

    // ** 处理header滚动状态 **
    oHeaderContainer.style.cssText += `
      transform: translateY(${
      nDeltaY > 0 ? '-100%' : 0
      });
    `;
  }

  /**
   * [处理] - 区分当前是刷新页面还是关闭页面
   * @description 页面刷新和页面关闭都会触发unload & beforeunload事件, 所以需要进行简单的区分
   */
  public handleWindowBeforeUnload = () => {
    this.beginTime = new Date().getTime();
  }

  /**
   * [处理] - 浏览器页面关闭时重置用户的状态
   * @description 用户在线状态 -> 离线
   * @description 用户处于聊天页状态 -> ''
   * @description 清除用户信息
   */
  public handleResetUserStatus = () => {
    this.differTime = new Date().getTime() - this.beginTime;

    if (this.differTime <= 5) {
      const userId = localStorage.getItem('userid');
      const chatId = null;

      // TODO 清空本地数据
      localStorage.removeItem('userid');
      localStorage.removeItem('token');

      // TODO 方式一
      // * 通过navigator.sendBeacon发送, 但是需要同时更新Status全局组件, 在每次visible = true的时候获取一次状态信息
      // * 火狐不兼容
      // navigator.sendBeacon(`http://localhost:8888/api/status/update/leave?userId=${userId}&chatId=${chatId}`);

      // TODO 方式二
      // * 火狐不兼容, Chrome、Edge正常
      this.state.statusIOClient.emit('sendResetUserStatus', {
        userId,
        chatId,
      });
    }
  }

  public render(): JSX.Element {
    return (
      <AdminWrapper>
        <AdminContent
          bgImg={BgImg}
          ref={this.$adminContentRef}
        >
          {/* 全局头部 */}
          <Header />

          {/* 全局权限路由 */}
          <LoadableAuthRoute />

          {/* 全局页面路由 */}
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/home/frontend" />
            )} />
            <Route path="/home" component={LoadableHome} />
            <Route path="/chat" component={LoadableChat} />
            <Route path="/publish" component={LoadablePublish} />
            <Route path="/settings" component={LoadableSettings} />
            <Route path="/pin" component={LoadablePin} />
            <Route path="/topic" component={LoadableTopic} />
            <Route path="/user/:id" component={LoadableUser} />
            <Route exact path="/collection/:id" component={LoadableCollection} />
            <Route exact path="/details/:id" component={LoadableDetails} />
            <Route exact path="/edit/:id" component={LoadableEdit} />
            <Route component={LoadableNotFound} />
          </Switch>

          {/* 全局右侧状态栏 */}
          <LoadableStatus />
        </AdminContent>
      </AdminWrapper>
    );
  }
}

export default withRouter(Admin);