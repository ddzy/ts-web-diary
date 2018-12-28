import * as React from 'react';
import { Location } from 'history';

import Header from './components/header/Header';


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

    // ** 处理header滚动状态 **
    oHeaderContainer.style.cssText += `
      transform: translateY(${
        nDeltaY > 0 ? '-100%' : 0
      });
    `;
  }

  public render(): JSX.Element {
    return (
      <div className="admin-wrapper">
        <div
          className="admin-content"
        >
          <Header location={this.props.location} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Admin;