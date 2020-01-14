import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Card } from "antd";

import {
  ArticleWrapper,
  ArticleMain,
  ArticleMainTitleBox,
  ArticleMainTitleText,
  ArticleMainContentBox,
  ArticleMainContentText,
  ArticleMainExtraBox
} from "./style";
import { IBaseCommonTrackCollectionArticleInfo } from "pages/user/User.types";
import { formatTime } from "utils/utils";

export interface IUserMainContentTrackCollectionArticleProps
  extends RouteComponentProps {
  // ? 收藏文章的足迹信息
  trackInfo: IBaseCommonTrackCollectionArticleInfo;
}
export interface IUserMainContentTrackCollectionArticleState {}

const UserMainContentTrackCollectionArticle = React.memo(
  (props: IUserMainContentTrackCollectionArticleProps) => {
    function _initContent() {
      return (
        <Card
          style={{
            width: "100%"
          }}
          title={_initCardTitle()}
          extra={_initCardExtra()}
        >
          {_initCardContent()}
        </Card>
      )
    }

    /**
     * [初始化] - 卡片标题
     */
    function _initCardTitle() {
      return (
        <ArticleMainTitleBox>
          收藏了文章至收藏夹
          <ArticleMainTitleText>
            {/* 处理当用户删除收藏夹时的处理逻辑 */}
            {
              props.trackInfo.collection
                ? (<Link to="">{props.trackInfo.collection.name}</Link>)
                : `(已删除)`
            }
          </ArticleMainTitleText>
        </ArticleMainTitleBox>
      );
    }

    /**
     * [初始化] - 卡片内容
     */
    function _initCardContent() {
      return (
        <ArticleMainContentBox>
          <ArticleMainContentText onClick={handleCardContentClick}>
            {props.trackInfo.article.title}
          </ArticleMainContentText>
        </ArticleMainContentBox>
      );
    }

    /**
     * [初始化] - 卡片的额外区域
     */
    function _initCardExtra() {
      return (
        <ArticleMainExtraBox>
          {formatTime(props.trackInfo.create_time)}
        </ArticleMainExtraBox>
      );
    }

    /**
     * [处理] - 当前主人收藏过的文章点击, 进入该文章的详情页
     */
    function handleCardContentClick() {
      const collectionArticleId = props.trackInfo.article._id;

      props.history.push(`/details/${collectionArticleId}`);
    }

    return (
      <ArticleWrapper>
        <ArticleMain>{_initContent()}</ArticleMain>
      </ArticleWrapper>
    );
  }
);

export default withRouter(UserMainContentTrackCollectionArticle);
