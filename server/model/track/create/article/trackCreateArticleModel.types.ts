/**
 * 发表文章的足迹接口
 */
export interface ITrackCreateArticleProps {
  _id: string;
  type: string;
  article: string;
  create_time: number;
  update_time: number;
};