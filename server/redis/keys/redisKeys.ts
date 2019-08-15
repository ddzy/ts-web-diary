// ? 应用用户在线状态
// * 存储方式: SortedSet
// * 域: userId
export const IOREDIS_USER_ONLINE = 'user_online';


// ? 应用用户当前正处于哪个会话(single + group)
// ! 暂时不考虑打开多个消息窗口的情况
// * 存储方式: Hash
// * 值域: userId
// * 值: chatId
export const IOREDIS_USER_ON_WHICH_CHAT = 'user_on_which_chat';