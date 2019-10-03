/**
 * 点赞文章的动态
 */
export interface IActivityStarArticleProps {
  // 唯一标识 id
  _id: string;

  // 动态类型
  type: string;

  // 点赞的文章
  article: string;

  create_time: number;
  update_time: number;
};