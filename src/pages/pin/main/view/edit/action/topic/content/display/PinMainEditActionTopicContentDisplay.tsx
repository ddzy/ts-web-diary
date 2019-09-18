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


export interface IPinMainEditActionTopicContentDisplayProps { };
export interface IPinMainEditActionTopicContentDisplayState { }


const PinMainEditActionTopicContentDisplay = React.memo((props: IPinMainEditActionTopicContentDisplayProps) => {
  /**
   * [初始化] - 话题列表项
   */
  function _initTopicItem() {
    return (
      <DisplayMainItem>
        <Row>
          <Col span={3}>
            {/* 头像框 */}
            <DisplayMainItemAvatarBox>
              <DisplayMainItemAvatar />
            </DisplayMainItemAvatarBox>
          </Col>
          <Col span={12}>
            {/* 额外信息 */}
            <DisplayMainItemInfoBox>
              {/* 话题名称 */}
              <DisplayMainItemInfoTitle>
                报 offer
              </DisplayMainItemInfoTitle>

              {/* 话题统计 */}
              <DisplayMainItemInfoExtra>
                {/* 关注人数 */}
                <DisplayMainItemInfoExtraFollow>
                  613 关注
                </DisplayMainItemInfoExtraFollow>

                <Divider type="vertical" />

                {/* 总沸点数 */}
                <DisplayMainItemInfoExtraTotal>
                  286 沸点
                </DisplayMainItemInfoExtraTotal>
              </DisplayMainItemInfoExtra>
            </DisplayMainItemInfoBox>
          </Col>
        </Row>
      </DisplayMainItem>
    );
  }

  return (
    <DisplayWrapper>
      <DisplayMain>
        <DisplayMainList>
          {_initTopicItem()}
          {_initTopicItem()}
        </DisplayMainList>
      </DisplayMain>
    </DisplayWrapper>
  );
});

export default PinMainEditActionTopicContentDisplay;