import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  message,
  notification,
} from 'antd';

import {
  MainWrapper,
  MainMain,
} from './style';
import { query } from 'services/request';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';
import TopicAllMainAttention from './attention/TopicAllMainAttention';
import TopicAllMainPossess from './possess/TopicAllMainPossess';


export interface ITopicAllMainProps extends RouteComponentProps { };
export interface ITopicAllMainState {
  topicInfo: {
    // ? 我关注的话题列表
    attentionTopicList: IBaseCommonTopicInfo[],
    // ? 所有话题列表
    allTopicList: IBaseCommonTopicInfo[],
  };
};


const TopicAllMain = React.memo((props: ITopicAllMainProps) => {
  const [state, setState] = React.useState<ITopicAllMainState>({
    topicInfo: {
      attentionTopicList: [],
      allTopicList: [],
    },
  });

  React.useEffect(() => {
    _getTopicListFromServer();
  }, []);


  /**
   * [获取] - 后台获取话题列表
   * @description 包括我关注的话题 + 全部话题
   */
  function _getTopicListFromServer() {
    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证丢失, 请重新登录!',
      });

      return props.history.push('/login');
    }

    query({
      method: 'GET',
      jsonp: false,
      url: '/api/topic/self/info/list/attention_and_all',
      data: {
        userId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const topicInfo = resData.topicInfo;
        const {
          attentionTopicList,
          allTopicList,
        } = topicInfo;

        setState({
          ...state,
          topicInfo: {
            ...state.topicInfo,
            attentionTopicList,
            allTopicList,
          },
        });
      } else {
        message.error(resMessage);
      }
    });
  }

  return (
    <MainWrapper>
      <MainMain>
        {/* 我关注的话题区 */}
        <TopicAllMainAttention
          attentionTopicList={state.topicInfo.attentionTopicList}
        />

        {/* 全部话题区 */}
        <TopicAllMainPossess
          allTopicList={state.topicInfo.allTopicList}
        />
      </MainMain>
    </MainWrapper>
  );
});


export default withRouter(TopicAllMain);