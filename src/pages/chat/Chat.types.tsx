// ? 聊天消息基本类型接口
export type IBaseCommonChatMessgaeType = 'plain' | 'image' | 'file';

// ? 聊天历史项基本信息接口
export interface IBaseCommonChatMemoryInfo {
  _id: string;
  chat_type: 'single' | 'group';
  chat_id: string;
  chat_name: string;
  chat_avatar: string;
  last_message_content: string;
  // * 最新的聊天内容类型
  last_message_content_type: IBaseCommonChatMessgaeType;
  // * 最新的发言人名称
  last_message_member_name: string;
  // * 未读消息总数
  unread_message_total: number;
};

// ? 应用用户基本信息接口
export interface IBaseCommonUserInfo {
  _id: string;
  username: string;
  useravatar: string;
};


/**
 * [单聊]
 */

// ? 单聊成员信息接口
export interface IBaseChatSingleMemberInfo {
  _id: string;
  chat_id: string;
  user_id: IBaseCommonUserInfo;
  create_message: IBaseChatSingleMessageInfo[];
  create_message_total: number;
  last_create_message_time: number;
  create_time: number;
};

// ? 单聊消息信息接口
export interface IBaseChatSingleMessageInfo {
  _id: string;
  chat_id: string;
  from_member_id: IBaseChatSingleMemberInfo;
  to_member_id: IBaseChatSingleMemberInfo;
  content_type: IBaseCommonChatMessgaeType;
  content: string;
  create_time: number;
  update_time: number;
};

// ? 单聊信息接口
export interface IBaseChatSingleInfo {
  _id: string;
  chat_id: string;
  from_member_id: IBaseChatSingleMemberInfo;
  to_member_id: IBaseChatSingleMemberInfo;
  message: IBaseChatSingleMessageInfo[];
  message_total: number;
  last_message_time: number;
  create_time: number;
  update_time: number;
};