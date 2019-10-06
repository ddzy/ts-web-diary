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
import { IBaseCommonArticleInfo } from 'pages/user/User.types';
import { formatTime } from 'utils/utils';
import BaseGoodsDisplay from 'components/widget/base_goods_display/BaseGoodsDisplay';


export interface IUserMainContentPostDisplayItemProps {
  // ? 单个文章的信息
  articleInfo: IBaseCommonArticleInfo;
};
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
                  src={props.articleInfo.author.useravatar}
                />
              </Lazyload>
            }
            title={<React.Fragment />}
            content={
              <div>
                <span>
                  {props.articleInfo.author.username}
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
                  {formatTime(props.articleInfo.create_time)}
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
                to={`/details/${props.articleInfo._id}`}
                activeStyle={{
                  color: '#1DA57A',
                }}
              >{props.articleInfo.title}</NavLink>
            </ItemMainContentTitleText>
          </ItemMainContentTitle>
          <ItemMainContentDescription>
            <ItemMainContentDescriptionText>
              {props.articleInfo.description}...
            </ItemMainContentDescriptionText>
          </ItemMainContentDescription>
        </ItemMainContentBox>

        {/* 额外信息区 */}
        <ItemMainExtraBox>
          <Row>
            <Col>
              <Tooltip title="阅读量" trigger="hover" placement="top">
                <Icon type="eye" />
                &nbsp;&nbsp;{props.articleInfo.watched_user.length}
              </Tooltip>
            </Col>
          </Row>
        </ItemMainExtraBox>
      </ItemMain>
    </ItemWrapper>
  );
});


export default UserMainContentPostDisplayItem;