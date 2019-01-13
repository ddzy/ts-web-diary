import * as React from 'react';

import HomeMain from './home_main/HomeMain';
import {
  IServiceState,
  serviceHandleGetHomeInfo,
} from './Home.service';
import {
  HomeWrapper,
} from './style';
import { PAGE_SIZE } from 'constants/constants';


export interface IHomeProps {
  location: Location;
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

  /**
   * 处理加载更多
   */
  // public handleLoadMoreArticleList = (
  //   page: number,
  //   pageSize: number,
  //   callback?: (...args: any[]) => void,
  // ): void => {
  //   const {
  //     pathname,
  //   } = this.props.location;
  //   const type: string = pathname.replace('/home/', '');

  //   serviceHandleGetArticleList(
  //     { type, page, pageSize },
  //     (data) => {
  //       callback && callback(data);
  //       this.setState((prevState) => {
  //         return {
  //           serviceState: {
  //             ...prevState.serviceState,
  //             article_list: prevState.serviceState.article_list.concat(data.articleList),
  //           },
  //         };
  //       });
  //     },
  //   );
  // }

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

export default Home;