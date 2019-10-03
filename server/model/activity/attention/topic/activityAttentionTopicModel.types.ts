/**
 * 关注话题的动态
 */
export interface IActivityAttentionTopicProps {
  // ? 唯一标识id
  _id: string;

  // ? 动态类型
  type: string;

  // ? 关注的话题
  topic: string;

  create_time: number;
  update_time: number;
};