import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  notification,
  message,
} from 'antd';

import {
  MainWrapper,
  MainMain,
} from './style';
import {
  IBaseCommonPinInfo,
} from 'pages/topic/Topic.types';
import { query } from 'services/request';
import { PIN_LIST_PAGE_SIZE_MEDIUM } from 'constants/constants';
import TopicSingleMainEdit from './edit/TopicSingleMainEdit';
import TopicSingleMainContent from './content/TopicSingleMainContent';


export interface ITopicSingleMainProps extends RouteComponentProps<{
  id: string,
}> { };
export interface ITopicSingleMainState {
  // ? 沸点列表
  pinList: IBaseCommonPinInfo[],
  // ? 是否显示首次加载数据的 loading 状态
  isShowFirstlyLoading: boolean;
};


const TopicSingleMain = React.memo((props: ITopicSingleMainProps) => {
  const [state, setState] = React.useState<ITopicSingleMainState>({
    pinList: [],
    isShowFirstlyLoading: false,
  });

  React.useEffect(() => {
    _getPinListFromServer(1);
  }, [props.location.pathname]);


  /**
   * [获取] - 后台获取沸点列表
   * @param page 当前页数
   */
  function _getPinListFromServer(
    page: number,
  ) {
    setState({
      ...state,
      isShowFirstlyLoading: true,
    });

    /* 用户鉴权 */
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    /* 获取该话题下的沸点列表 */
    const topicId = props.match.params.id;

    query({
      method: 'POST',
      jsonp: false,
      url: '/api/topic/pin/info/list',
      data: {
        userId,
        topicId,
        page,
        pageSize: PIN_LIST_PAGE_SIZE_MEDIUM,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const pinList = resData.pinList;

        setState({
          ...state,
          pinList,
          isShowFirstlyLoading: false,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 发送沸点
   * @param pinInfo 创建的沸点信息
   * @param callback 回调处理器
   */
  function handlePinSend(
    pinInfo: any,
    callback?: () => void,
  ) {
    /* 用户凭证检测 */
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    query({
      jsonp: false,
      method: 'POST',
      url: '/api/pin/self/create',
      data: {
        userId,
        pinInfo,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        /* 判断用户发表的沸点是否属于当前话题 */
        const currentTopicId = props.match.params.id;
        const receivedTopicId = resData.pinInfo.topic_id._id;

        if (currentTopicId === receivedTopicId) {
          setState({
            ...state,
            pinList: [
              resData.pinInfo,
              ...state.pinList,
            ],
          });
        }

        message.success(resMessage);
      } else {
        message.error(resMessage);
      }

      callback && callback();
    }).catch(() => {
      callback && callback();
    });
  }

  return (
    <MainWrapper>
      <MainMain>
        {/* 头部沸点编辑区 */}
        <TopicSingleMainEdit
          onSend={handlePinSend}
        />

        {/* 底部沸点列表区 */}
        <TopicSingleMainContent
          isShowFirstlyLoading={state.isShowFirstlyLoading}
          pinList={state.pinList}
        />
      </MainMain>
    </MainWrapper>
  );
});


export default withRouter(TopicSingleMain);