import * as React from 'react';
import {
  Row,
  Col,
} from 'antd';

import {
  DisplayWrapper,
  DisplayMain,
} from './style';
import BaseGoodsDisplayCover from './cover/BaseGoodsDisplayCover';
import BaseGoodsDisplayInfo from './info/BaseGoodsDisplayInfo';


export interface IBaseGoodsDisplayProps {
  // ? 物品的封面主题图片
  cover: React.ReactNode;
  // ? 物品的标题文字
  title: React.ReactNode;
  // ? 物品的内容区域列表
  content: React.ReactNode;
  // ? 物品的操作栏
  action: React.ReactNode;
};
export interface IBaseGoodsDisplayState { };


const BaseGoodsDisplay = React.memo((props: IBaseGoodsDisplayProps) => {
  return (
    <DisplayWrapper>
      <DisplayMain>
        <Row>
          <Col span={6}>
            {/* 左侧头像区块 */}
            <BaseGoodsDisplayCover
              cover={props.cover}
            />
          </Col>
          <Col span={18}>
            {/* 右侧内容区块 */}
            <BaseGoodsDisplayInfo
              title={props.title}
              content={props.content}
              action={props.action}
            />
          </Col>
        </Row>
      </DisplayMain>
    </DisplayWrapper>
  );
});


export default BaseGoodsDisplay;