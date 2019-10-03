/**
 * 关注用户的动态
 */
export interface IActivityAttentionPeopleProps {
  // ? 唯一标识id
  _id: string;

  // ? 动态类型
  type: string;

  // ? 关注的用户
  user: string;

  create_time: number;
  update_time: number;
};