import * as React from 'react';
import Lazyload from 'react-lazyload';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Empty,
  Divider,
  Button,
} from 'antd';

import {
  ContentWrapper,
  ContentMain,
  ContentMainList,
  ContentMainItem,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'pages/topic/Topic.types';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface ITopicAllPossessContentProps extends RouteComponentProps {
  // ? 我关注的话题列表
  allTopicList: IBaseCommonTopicInfo[];
};
export interface ITopicAllPossessContentState { };


const TopicAllPossessContent = React.memo((props: ITopicAllPossessContentProps) => {
  /**
   * [初始化] - 话题列表
   */
  function _initTopicList() {
    const topicList = props.allTopicList;

    return topicList.length === 0
      ? (<Empty description="暂时没有话题..." />)
      : (
        topicList.map((v) => {
          return (
            <ContentMainItem
              key={v._id}
              onClick={() => handleTopicItemClick(v._id)}
            >
              <BaseGoodsDisplay
                cover={
                  <Lazyload>
                    <img
                      style={{
                        width: 60,
                        height: 60,
                      }}
                      src={v.cover_img}
                    />
                  </Lazyload>
                }
                title={<span>{v.name}</span>}
                content={
                  <div>
                    <span>
                      {v.followers.length}  关注
                    </span>
                    <Divider
                      type="vertical"
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                      }}
                    />
                    <span>
                      {v.pins.length}  沸点
                    </span>
                  </div>
                }
                action={
                  <div>
                    {
                      v.is_attention
                        ? (
                          <span>已关注</span>
                        )
                        : (
                          <Button
                            type="link"
                            icon="plus"
                          >关注</Button>
                        )
                    }
                  </div>
                }
              />
            </ContentMainItem>
          );
        })
      )
  }

  /**
   * [处理] - 话题列表项点击
   * @param topicId 话题id
   */
  function handleTopicItemClick(
    topicId: string,
  ) {
    props.history.push(`/topic/${topicId}`);
  }

  return (
    <ContentWrapper>
      <ContentMain>
        <ContentMainList>
          {_initTopicList()}
        </ContentMainList>
      </ContentMain>
    </ContentWrapper>
  );
});


export default withRouter(TopicAllPossessContent);