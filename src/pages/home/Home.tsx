import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router';

import HomeMain from './home_main/HomeMain';
import {
  IServiceState,
  serviceHandleGetHomeInfo,
} from './Home.service';
import {
  HomeWrapper,
} from './style';
import { PAGE_SIZE } from 'constants/constants';


export interface IHomeProps extends RouteComponentProps {
};
interface IHomeState extends IServiceState {
  globalLoading: boolean;
};


class Home extends React.Component<IHomeProps, IHomeState> {

  public readonly state = {
    articleList: [],
    globalLoading: false,
  }

  public componentDidMount(): void {
    this.handleGetInfo();
  }

  /**
   * 获取首屏相关数据
   */
  public handleGetInfo = (): void => {
    const {
      pathname
    } = this.props.location;
    const type = pathname.replace('/home/', '');

    this.setState({
      globalLoading: true,
    });

    serviceHandleGetHomeInfo(
      { type, page: 1, pageSize: PAGE_SIZE, },
      (data) => {
        const {
          articleList,
        } = data.info;

        this.setState({
          globalLoading: false,
          articleList,
        });
      },
    );
  }

  public render(): JSX.Element {
    return (
      <HomeWrapper
      >
        <HomeMain
          globalLoading={this.state.globalLoading}
          articleList={this.state.articleList}
        />
      </HomeWrapper>
    );
  }

}

export default withRouter(Home);