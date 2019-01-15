import * as React from 'react';
import { Location } from 'history';
import { hot } from 'react-hot-loader';

import Header from '../../components/header/Header';
import {
  AdminWrapper,
  AdminContent,
} from './style';
import BgImg from '../../static/images/admin_bg_img.png';


export interface IAdminProps {
  location: Location;
  children: any;
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
          <Header location={this.props.location} />
          {this.props.children}
        </AdminContent>
      </AdminWrapper>
    );
  }
}

export default hot(module)(Admin);