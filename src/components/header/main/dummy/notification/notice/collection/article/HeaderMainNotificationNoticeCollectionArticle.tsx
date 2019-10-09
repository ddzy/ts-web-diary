import * as React from 'react';
import {
  NavLink,
} from 'react-router-dom';

import {
  ArticleWrapper,
  ArticleMain,
} from './style';
import {
  IBaseNotificationUserCollectionArticleParams,
} from 'components/header/Header.types';


export interface IHeaderMainNotificationNoticeCollectionArticleProps {
  // ? 点赞文章的通知信息
  notificationInfo: IBaseNotificationUserCollectionArticleParams;
};
export interface IHeaderMainNotificationNoticeCollectionArticleState { };


const HeaderMainNotificationNoticeCollectionArticle = React.memo((props: IHeaderMainNotificationNoticeCollectionArticleProps) => {
  return (
    <ArticleWrapper>
      <ArticleMain>
        用户
        <NavLink
          to={`/user/${props.notificationInfo.from._id}`}
        >  {props.notificationInfo.from.username}</NavLink>  将你的文章 <NavLink
          to={`/details/${props.notificationInfo.article._id}`}
        >  {props.notificationInfo.article.title}</NavLink>  添加至
        <NavLink
          to={``}
        >  {props.notificationInfo.collection.name}</NavLink>  收藏夹
      </ArticleMain>
    </ArticleWrapper>
  );
});


export default HeaderMainNotificationNoticeCollectionArticle;