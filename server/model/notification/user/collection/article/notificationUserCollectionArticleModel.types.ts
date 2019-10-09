/**
 * 用户收藏文章的通知模型
 */
export interface INotificationUserCollectionArticleProps {
  _id: string;
  type: string;
  from: string;
  collection: string;
  article: string;
  article_author: string;
  create_time: number;
  update_time: number;
};