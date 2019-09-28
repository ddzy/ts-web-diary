import * as React from 'react';
import {
  Empty,
  Spin,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import {
  IBaseCommonPinInfo,
} from 'pages/topic/Topic.types';
import BasePinItem from 'components/widget/base_pin_item/BasePinItem';


export interface ITopicSingleMainContentProps {
  // ? 沸点列表
  pinList: IBaseCommonPinInfo[],
  // ? 是否显示首屏数据加载时的loading状态
  isShowFirstlyLoading: boolean;
};
export interface ITopicSingleMainContentState { };


const TopicSingleMainContent = React.memo((props: ITopicSingleMainContentProps) => {
  /**
   * [初始化] - 沸点列表
   */
  function _initPinList() {
    const { pinList } = props;

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
    <Spin spinning={props.isShowFirstlyLoading}>
      <ContentWrapper>
        <ContentMain>
          <ContentMainList>
            {_initPinList()}
          </ContentMainList>
        </ContentMain>
      </ContentWrapper>
    </Spin>
  );
});


export default TopicSingleMainContent;