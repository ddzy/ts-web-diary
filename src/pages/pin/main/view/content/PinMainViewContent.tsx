import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  notification,
  message,
  Empty,
  Skeleton,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import {
  IBaseCommonPinInfo,
} from 'pages/pin/Pin.types';
import {
  PIN_LIST_PAGE_SIZE_MEDIUM,
} from 'constants/constants';
import { query } from 'services/request';
import BasePinItem from 'components/widget/base_pin_item/BasePinItem';


export interface IPinMainViewContentProps extends RouteComponentProps<{
  id: string,
  type: string,
}> {
};
export interface IPinMainViewContentState {
  // ? 沸点列表
  pinList: IBaseCommonPinInfo[];
  // ? 是否显示首次加载沸点列表的loading
  isShowFirstlyLoading: boolean;
}


const PinMainViewContent = React.memo((props: IPinMainViewContentProps) => {
  const [state, setState] = React.useState<IPinMainViewContentState>({
    pinList: [],
    isShowFirstlyLoading: false,
  });

  React.useEffect(() => {
    _getPinListFromServer(1, true);
  }, [props.location.pathname]);


  /**
   * [获取] - 沸点列表
   * @param page 当前页数
   * @param initialLoad 是否首次加载(便于展示不同状态的loading)
   */
  function _getPinListFromServer(
    page: number,
    initialLoad: boolean,
  ) {
    setState({
      ...state,
      isShowFirstlyLoading: page === 1,
    });

    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      return notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });
    }

    const type = props.match.params.type;
    const pageSize = PIN_LIST_PAGE_SIZE_MEDIUM;
    let queryUrl = '';
    let queryData: Record<string, any> = {
      page,
      userId,
      pageSize,
    };

    switch (type) {
      case 'topic': {
        // 获取对应的话题下的沸点
        const topicId = props.match.params.id;

        queryUrl = '/api/topic/pin/info/list';
        queryData = {
          ...queryData,
          topicId,
        };

        break;
      };
      case 'recommend': {
        // TODO 获取推荐沸点

        break;
      };
      case 'hot': {
        // TODO 获取热门沸点
        break;
      };
      case 'attention': {
        // TODO 获取我关注的人发的沸点
        break;
      };
      default: {
        break;
      };
    }

    query({
      method: 'POST',
      jsonp: false,
      url: queryUrl,
      data: queryData,
    }).then((res) => {
      const resCode = res.code;
      const resMessage = res.message;
      const resData = res.data;

      if (resCode === 0) {
        const pinList = resData.pinList;

        // 根据是否首次加载, 初始化不同的沸点列表
        const newPinList = initialLoad
          ? pinList
          : state.pinList.concat(pinList);

        setState({
          ...state,
          isShowFirstlyLoading: false,
          pinList: newPinList,
        });
      } else {
        setState({
          ...state,
          isShowFirstlyLoading: false,
        });

        message.error(resMessage);
      }
    }).catch(() => {
      message.error('网络出现错误, 请检查网络后重试!');
    });
  }

  /**
   * [辅助] - 根据loading状态, 创建不同的内容容器
   * @param component 需要包裹的内容
   */
  function _aidedCreatSkeletonWrapper(component: React.ReactChild) {
    const { isShowFirstlyLoading } = state;

    return isShowFirstlyLoading
      ? (
        <div
          style={{
            marginTop: 12,
            padding: 20,
            backgroundColor: '#fff',
            boxShadow: '0 2px 2px rgba(0, 0, 0, .02)',
          }}
        >{component}</div>
      )
      : (<React.Fragment>{component}</React.Fragment>);
  }

  /**
   * [初始化] - 沸点列表
   */
  function _initPinList() {
    const { pinList } = state;

    return pinList.length !== 0
      ? pinList.map((v) => {
          return (
            <ContentMainItem key={v._id}>
              <BasePinItem
                pinInfo={v}
              />
            </ContentMainItem>
          );
        })
      : (
        <ContentMainItem>
          <Empty description="该话题下暂时没有沸点哦~" />
        </ContentMainItem>
      );
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_aidedCreatSkeletonWrapper((
            <Skeleton
              active={true}
              avatar={true}
              paragraph={{
                rows: 5,
              }}
              loading={state.isShowFirstlyLoading}
            >
              {_initPinList()}
            </Skeleton>
          ))}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});

export default withRouter(PinMainViewContent);