import * as React from 'react';
import {
  Empty,
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
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_initPinList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});


export default TopicSingleMainContent;