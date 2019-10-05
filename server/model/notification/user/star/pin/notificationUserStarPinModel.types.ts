/**
 * 用户点赞沸点的通知信息
 */
export interface INotificationUserStarPinProps {
  _id: string;
  type: string;
  from: string;
  pin: string;
  pin_author: string;
  create_time: number;
  update_time: number;
};