/**
 * 用户收藏文章的足迹
 */
export interface ITrackCollectionArticleProps {
  _id: string;
  type: string;
  article: string;
  article_author: string;
  collection: string;
  create_time: number;
  update_time: number;
};