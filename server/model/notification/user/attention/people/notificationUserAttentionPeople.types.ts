/**
 * 关注用户的通知模型
 */
export interface INotificationUserAttentionPeopleProps {
  _id: string;
  type: string;
  from: string;
  to: string;
  create_time: number;
  update_time: number;
};