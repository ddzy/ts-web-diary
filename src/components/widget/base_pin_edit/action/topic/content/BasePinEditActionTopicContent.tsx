import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  notification,
  message,
  Spin,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
} from './style';
import PinMainEditActionTopicContentSearch from './search/BasePinEditActionTopicContentSearch';
import PinMainEditActionTopicContentDisplay from './display/BasePinEditActionTopicContentDisplay';
import {
  IBaseCommonTopicInfo,
} from 'components/widget/base_pin_edit/BasePinEdit.types';
import { query } from 'services/request';


export interface IBasePinEditActionTopicContentProps extends RouteComponentProps {
  onTopicContentChange: (
    topicInfo: IBaseCommonTopicInfo,
  ) => void;
};
export interface IBasePinEditActionTopicContentState {
  // ? 话题列表
  topicList: IBaseCommonTopicInfo[];
  // ? 获取话题列表时的loading状态
  isShowTopicListLoading: boolean;
};


const BasePinEditActionTopicContent = React.memo((props: IBasePinEditActionTopicContentProps) => {
  const [state, setState] = React.useState<IBasePinEditActionTopicContentState>({
    topicList: [],
    isShowTopicListLoading: false,
  });

  React.useEffect(() => {
    _getTopicListFromServer();
  }, []);


  /**
   * [后台] - 获取话题列表
   */
  function _getTopicListFromServer() {
    // 用户凭证检测
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    setState({
      ...state,
      isShowTopicListLoading: true,
    });

    query({
      method: 'GET',
      url: '/api/topic/info/list',
      jsonp: false,
      data: {
        userId,
      },
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        setState({
          ...state,
          topicList: resData.topicList,
          isShowTopicListLoading: false,
        });
      } else {
        setState({
          ...state,
          isShowTopicListLoading: false,
        });

        message.error(resMessage);
      }
    });
  }

  return (
    <ContentWrapper>
      <ContentMain>
        {/* 话题搜索框区块 */}
        <PinMainEditActionTopicContentSearch />

        {/* 话题列表展示区块 */}
        <Spin spinning={state.isShowTopicListLoading}>
          <PinMainEditActionTopicContentDisplay
            topicList={state.topicList}
            onTopicContentChange={props.onTopicContentChange}
          />
        </Spin>
      </ContentMain>
    </ContentWrapper>
  );
});

export default withRouter(BasePinEditActionTopicContent);