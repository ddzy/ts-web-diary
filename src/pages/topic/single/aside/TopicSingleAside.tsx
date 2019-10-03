import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  notification,
  message,
  Affix,
} from 'antd';

import {
  AsideWrapper,
  AsideMain,
} from './style';
import {
  IStaticTopicInfo,
} from 'pages/topic/Topic.types';
import { query } from 'services/request';
import {
  TRACK_TYPE,
} from 'constants/constants';
import TopicSingleAsideInfo from './info/TopicSingleAsideInfo';
import TopicSingleAsideActor from './actor/TopicSingleAsideActor';


export interface ITopicSingleAsideProps extends RouteComponentProps<{
  id: string,
}> { };
export interface ITopicSingleAsideState {
  // ? 单个话题的详细信息
  topicInfo: IStaticTopicInfo & {
    is_attention: boolean;
  };

  // ? 是否显示获取首屏数据时的 loading 状态
  isShowFirstlyLoading: boolean;
};


const TopicSingleAside = React.memo((props: ITopicSingleAsideProps) => {
  const [state, setState] = React.useState<ITopicSingleAsideState>({
    topicInfo: {
      _id: '',
      name: '',
      description: '',
      cover_img: '',
      create_time: Date.now(),
      update_time: Date.now(),
      pins: [],
      actors: [],
      followers: [],
      is_attention: false,
    },
    isShowFirstlyLoading: false,
  });

  React.useEffect(() => {
    _getTopicInfoFromServer();
  }, [props.location.pathname]);


  /**
   * [获取] - 后台获取话题的相关信息
   */
  function _getTopicInfoFromServer() {
    setState({
      ...state,
      isShowFirstlyLoading: true,
    });

    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const topicId = props.match.params.id;

    query({
      jsonp: false,
      method: 'GET',
      url: '/api/topic/self/info',
      data: {
        userId,
        topicId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const topicInfo = resData.topicInfo;

        setState({
          ...state,
          topicInfo,
          isShowFirstlyLoading: false,
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  /**
   * [处理] - 关注 or 取消关注话题
   * @param data 关注的话题信息
   * @param callback 回调处理器
   */
  function handleToggleAttention(
    data: {
      topicId: string,
      isAttention: boolean,
    },
    callback?: () => void,
  ) {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    const trackType = TRACK_TYPE.attention.topic;

    query({
      url: '/api/action/attention/topic',
      method: 'POST',
      jsonp: false,
      data: {
        userId,
        trackType,
        ...data,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;

      if (resCode === 0) {
        const newFollowers = data.isAttention
          ? state.topicInfo.followers.concat(userId)
          : state.topicInfo.followers.filter((follower) => follower !== userId);

        setState({
          ...state,
          topicInfo: {
            ...state.topicInfo,
            is_attention: data.isAttention,
            followers: newFollowers,
          },
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <Affix offsetTop={80}>
      <AsideWrapper>
        <AsideMain>
          {/* 话题信息区 */}
          <TopicSingleAsideInfo
            topicInfo={state.topicInfo}
            isShowFirstlyLoading={state.isShowFirstlyLoading}
            onToggleAttention={handleToggleAttention}
          />

          {/* 话题参与者区 */}
          <TopicSingleAsideActor
            topicInfo={state.topicInfo}
            isShowFirstlyLoading={state.isShowFirstlyLoading}
          />
        </AsideMain>
      </AsideWrapper>
    </Affix>
  );
});


export default withRouter(TopicSingleAside);