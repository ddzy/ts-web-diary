import * as IOClient from 'socket.io-client';

import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


/**
 * [通知] - 用户状态
 */
export const statusIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`);

/**
 * [通知] - 好友
 */
export const notificationUserFriendIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/friend`);

/**
 * [通知] - 文章点赞
 */
export const notificationUserStarArticleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/star/article`);

/**
 * [通知] - 关注用户
 */
export const notificationUserAttentionPeopleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/attention/people`);

/**
 * [聊天] - 单聊
 */
export const chatSingleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/chat/single`);