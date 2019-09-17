import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  ArticleWrapper,
  ArticleMain,
} from './style';
import {
  IBaseNotificationUserStarArticleParams,
} from 'components/header/Header.types';


export interface IHeaderMainDummyNotificationNoticeStarArticleProps {
  // ? 点赞文章的通知信息
  notificationInfo: IBaseNotificationUserStarArticleParams;
};
export interface IHeaderMainDummyNotificationNoticeStarArticleState { }


const HeaderMainDummyNotificationNoticeStarArticle = React.memo((props: IHeaderMainDummyNotificationNoticeStarArticleProps) => {
  return (
    <ArticleWrapper>
      <ArticleMain>
        用户
        <NavLink
          to={`/user/${props.notificationInfo.from._id}`}
        >  {props.notificationInfo.from.username}</NavLink>  赞了你的文章: <NavLink
          to={`/details/${props.notificationInfo.article._id}`}
        >  {props.notificationInfo.article.title}</NavLink>
      </ArticleMain>
    </ArticleWrapper>
  );
});

export default HeaderMainDummyNotificationNoticeStarArticle;