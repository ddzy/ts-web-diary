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
  loader: () => import('pages/publish/Publish'),
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



export interface IAdminProps extends RouteComponentProps {
};
interface IAdminState {
  pathname: string;
}

class Admin extends React.Component<IAdminProps, IAdminState> {
  public static getDerivedStateFromProps(
    nextProps: IAdminProps,
  ): IAdminState {
    return {
      pathname: nextProps.location.pathname,
    };
  }

  public readonly state: IAdminState = {
    pathname: '',
  }

  public componentDidMount(): void {
    window.addEventListener('wheel', this.aidedHandleMouseWheel);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('wheel', this.aidedHandleMouseWheel);
  }

  public shouldComponentUpdate(
    nextProps: IAdminProps,
  ): boolean {
    const currentPathname = this.state.pathname;
    const nextPathname = nextProps.location.pathname;

    return nextPathname !== currentPathname;
  }

  public aidedHandleMouseWheel(
    e: WheelEvent,
  ): void {
    const nDeltaY = e.deltaY as number;
    const oHeaderContainer = document
      .querySelector('#header-main-container') as HTMLDivElement;
    const oHomeMainNavBar = document
      .querySelector('#home-nav-bar') as HTMLDivElement;
    const oHomeMainNavBarParent = oHomeMainNavBar && oHomeMainNavBar
      .parentElement as HTMLDivElement;

    // ** 处理header滚动状态 **
    oHeaderContainer.style.cssText += `
      transform: translateY(${
        nDeltaY > 0 ? '-100%' : 0
      });
    `;

    // ** 处理Home页二级导航滚动 **
    if (oHomeMainNavBar && oHomeMainNavBarParent) {
      oHomeMainNavBar.style.cssText += `
        transform: translateY(${
          nDeltaY > 0 ? '-100%' : 0
        });
      `;
      oHomeMainNavBarParent.style.cssText += `
        z-index: ${
          nDeltaY > 0 ? 'initial' : 10
        };
      `;
    }
  }

  public render(): JSX.Element {
    return (
      <AdminWrapper>
        <AdminContent
          bgImg={BgImg}
        >
          {/* 全局头部 */}
          <Header />

          {/* 全局权限路由 */}
          <LoadableAuthRoute />

          {/* 全局页面路由 */}
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/home" />
            )} />
            <Route path="/home" component={LoadableHome} />
            <Route path="/chat" component={LoadableChat} />
            <Route path="/user/:id" component={LoadableUser} />
            <Route exact path="/collection/:id" component={LoadableCollection} />
            <Route exact path="/details/:id" component={LoadableDetails} />
            <Route exact path="/edit/:id" component={LoadableEdit} />
            <Route exact path="/publish" component={LoadablePublish} />
            <Route component={LoadableNotFound} />
          </Switch>
        </AdminContent>
      </AdminWrapper>
    );
  }
}

export default withRouter(Admin);