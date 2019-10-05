/**
 * 点赞沸点的足迹信息
 */
export interface ITrackStarPinProps {
  // 唯一标识 id
  _id: string;

  // 动态类型
  type: string;

  // 点赞的沸点
  pin: string;

  // 点赞的沸点作者
  pin_author: string;

  create_time: number;
  update_time: number;
};