export interface INotificationUserFriendRequestModelProps {
  _id: string;
  type: string;
  agree_state: 0 | 1 | -1;
  from: string;
  to: string;
  description: string;
  create_time: number;
  update_time: number;
};