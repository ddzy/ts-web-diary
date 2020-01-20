/**
 * @description 邀请好友加入群聊的通知模型
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export interface INotificationUserChatGroupInviteProps {
  _id: string;
  group: string;
  type: string;
  from: string;
  to: string;
  create_time: number;
  update_time: number;
};