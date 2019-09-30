import * as React from 'react';
import Lazyload from 'react-lazyload';
import {
  Divider,
} from 'antd';

import {
  DisplayWrapper,
  DisplayMain,
  DisplayMainList,
  DisplayMainItem,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'components/widget/base_pin_edit/BasePinEdit.types';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface IBasePinEditActionTopicContentDisplayProps {
  // ? 话题列表
  topicList: IBaseCommonTopicInfo[];

  onTopicContentChange: (
    topicInfo: IBaseCommonTopicInfo,
  ) => void;
};
export interface IBasePinEditActionTopicContentDisplayState { }


const BasePinEditActionTopicContentDisplay = React.memo((props: IBasePinEditActionTopicContentDisplayProps) => {
  function __initTopicItem() {
    return props.topicList.map((v) => {
      return (
        <DisplayMainItem
          key={v._id}
          onClick={() => props.onTopicContentChange(v)}
        >
          <BaseGoodsDisplay
            cover={
              <Lazyload scrollContainer='#pin-edit-topic-scroll-container'>
                <img
                  style={{
                    width: 50,
                    height: 50,
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
            action={<React.Fragment />}
          />
        </DisplayMainItem>
      );
    });
  }

  return (
    <DisplayWrapper>
      <DisplayMain id="pin-edit-topic-scroll-container">
        <DisplayMainList>
          {__initTopicItem()}
        </DisplayMainList>
      </DisplayMain>
    </DisplayWrapper>
  );
});

export default BasePinEditActionTopicContentDisplay;