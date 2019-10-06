import * as React from 'react';
import Lazyload from 'react-lazyload';
import {
  NavLink,
} from 'react-router-dom';
import {
  Divider,
  Avatar,
  Icon,
  Row,
  Col,
  Tooltip,
} from 'antd';

import {
  ItemWrapper,
  ItemMain,
  ItemMainTitleBox,
  ItemMainContentBox,
  ItemMainContentTitle,
  ItemMainContentTitleText,
  ItemMainContentDescription,
  ItemMainContentDescriptionText,
  ItemMainExtraBox,
} from './style';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface IUserMainContentPostDisplayItemProps { };
export interface IUserMainContentPostDisplayItemState { };


const UserMainContentPostDisplayItem = React.memo((props: IUserMainContentPostDisplayItemProps) => {
  return (
    <ItemWrapper>
      <ItemMain>
        {/* 标题区 */}
        <ItemMainTitleBox>
          <BaseGoodsDisplay
            cover={
              <Lazyload>
                <Avatar
                  icon="user"
                  size="large"
                  src={''}
                />
              </Lazyload>
            }
            title={<React.Fragment />}
            content={
              <div>
                <span>
                  ddzy
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
                  3 小时前
                </span>
              </div>
            }
            action={<React.Fragment />}
          />
        </ItemMainTitleBox>

        {/* 内容区 */}
        <ItemMainContentBox>
          <ItemMainContentTitle>
            <ItemMainContentTitleText>
              <NavLink
                to={`/details/`}
                activeStyle={{
                  color: '#1DA57A',
                }}
              >微前端入门</NavLink>
            </ItemMainContentTitleText>
          </ItemMainContentTitle>
          <ItemMainContentDescription>
            <ItemMainContentDescriptionText>
              最近打算改进一下现有网站的架构，微前端这个词多次进入了我的视野。但是网上关于微前端文章总是说得似是而非，于是我找到这篇文章进行翻译。并大概理解微前端的理念。目前还没有确定是否使用微前端架构，因为看起来业界对最佳实践并没有达成一致。
            </ItemMainContentDescriptionText>
          </ItemMainContentDescription>
        </ItemMainContentBox>

        {/* 额外信息区 */}
        <ItemMainExtraBox>
          <Row>
            <Col>
              <Tooltip title="阅读量" trigger="hover" placement="top">
                <Icon type="eye" />
                &nbsp;&nbsp;999
              </Tooltip>
            </Col>
          </Row>
        </ItemMainExtraBox>
      </ItemMain>
    </ItemWrapper>
  );
});


export default UserMainContentPostDisplayItem;