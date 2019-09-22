import * as React from 'react';
import {
  NavLink,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Divider,
  message,
} from 'antd';

import {
  NavWrapper,
  NavMain,
  NavMainList,
  NavMainItem,
} from './style';
import { query } from 'services/request';


export interface IPinMainNavProps extends RouteComponentProps { };
export interface IPinMainNavState {
  // ? 导航列表
  pinNavList: Array<{
    name: string,
    path: string,
  }>;
}


const PinMainNav = React.memo((props: IPinMainNavProps) => {
  const [state, setState] = React.useState<IPinMainNavState>({
    pinNavList: [
      {
        name: '推荐',
        path: '/pin/recommend',
      },
      {
        name: '热门',
        path: '/pin/hot',
      },
      {
        name: '关注',
        path: '/pin/attention',
      },
    ],
  });

  React.useEffect(() => {
    _getTopicListFromServer();
  }, []);


  /**
   * [获取] - 话题列表
   * @description 根据后台获取的话题列表, 初始化导航路由
   */
  function _getTopicListFromServer() {
    query({
      method: 'GET',
      url: '/api/topic/self/info/list',
      jsonp: false,
      data: {},
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const topicList: Array<{
          _id: string,
          name: string,
        }> = resData.topicList.slice(0, 8);

        const newPinNavList = topicList.map((v) => {
          return {
            name: v.name,
            path: `/pin/topic/${v._id}`,
          };
        });

        setState({
          ...state,
          pinNavList: state.pinNavList.concat(newPinNavList),
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [初始化] - 导航列表
   */
  function _initNavItem() {
    const { pinNavList } = state;

    return pinNavList.map((v, i) => {
      if (i === 2) {
        return (
          <React.Fragment key={i}>
            <NavMainItem
              key={i}
            >
              <NavLink
                activeStyle={{
                  color: '#1da57a',
                }}
                to={v.path}
              >{v.name}</NavLink>
            </NavMainItem>

            <Divider />
          </React.Fragment>
        );
      }

      return (
        <NavMainItem
          key={i}
        >
          <NavLink
            strict={true}
            activeStyle={{
              color: '#1da57a',
            }}
            to={v.path}
          >{v.name}</NavLink>
        </NavMainItem>
      );
    });
  }

  return (
    <NavWrapper>
      <NavMain>
        <NavMainList>
          {_initNavItem()}
        </NavMainList>
      </NavMain>
    </NavWrapper>
  );
});

export default withRouter(PinMainNav);