import * as React from 'react';
import {
  Row,
  Col,
  Divider,
} from 'antd';

import {
  DisplayWrapper,
  DisplayMain,
  DisplayMainList,
  DisplayMainItem,
  DisplayMainItemAvatarBox,
  DisplayMainItemAvatar,
  DisplayMainItemInfoBox,
  DisplayMainItemInfoTitle,
  DisplayMainItemInfoExtra,
  DisplayMainItemInfoExtraFollow,
  DisplayMainItemInfoExtraTotal,
} from './style';
import {
  IBaseCommonTopicInfo,
} from 'components/widget/base_pin_edit/BasePinEdit.types';


export interface IBasePinEditActionTopicContentDisplayProps {
  // ? 话题列表
  topicList: IBaseCommonTopicInfo[];

  onTopicContentChange: (
    topicInfo: IBaseCommonTopicInfo,
  ) => void;
};
export interface IBasePinEditActionTopicContentDisplayState { }


const BasePinEditActionTopicContentDisplay = React.memo((props: IBasePinEditActionTopicContentDisplayProps) => {
  /**
   * [初始化] - 话题列表项
   */
  function _initTopicItem(): JSX.Element[] {
    return props.topicList.map((v) => {
      return (
        <DisplayMainItem
          key={v._id}
          onClick={() => props.onTopicContentChange(v)}
        >
          <Row>
            <Col span={4}>
              {/* 头像框 */}
              <DisplayMainItemAvatarBox>
                <DisplayMainItemAvatar coverUrl={v.cover_img} />
              </DisplayMainItemAvatarBox>
            </Col>
            <Col span={20}>
              {/* 额外信息 */}
              <DisplayMainItemInfoBox>
                {/* 话题名称 */}
                <DisplayMainItemInfoTitle>
                  {v.name}
                </DisplayMainItemInfoTitle>

                {/* 话题统计 */}
                <DisplayMainItemInfoExtra>
                  {/* 关注人数 */}
                  <DisplayMainItemInfoExtraFollow>
                    {v.followers.length} 关注
                  </DisplayMainItemInfoExtraFollow>

                  <Divider type="vertical" />

                  {/* 总沸点数 */}
                  <DisplayMainItemInfoExtraTotal>
                    {v.pins.length} 沸点
                  </DisplayMainItemInfoExtraTotal>
                </DisplayMainItemInfoExtra>
              </DisplayMainItemInfoBox>
            </Col>
          </Row>
        </DisplayMainItem>
      );
    });
  }

  return (
    <DisplayWrapper>
      <DisplayMain>
        <DisplayMainList>
          {_initTopicItem()}
        </DisplayMainList>
      </DisplayMain>
    </DisplayWrapper>
  );
});

export default BasePinEditActionTopicContentDisplay;