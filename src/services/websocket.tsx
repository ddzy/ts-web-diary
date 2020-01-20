import * as IOClient from 'socket.io-client';

import {
  SOCKET_CONNECTION_INFO,
} from 'constants/constants';


/**
 * @description 通知(用户状态)
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const statusIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/status`);

/**
 * @description 通知(好友申请)
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const notificationUserFriendIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/friend`);

/**
 * @description 通知(文章点赞)
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const notificationUserStarArticleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/star/article`);

/**
 * @description 通知(沸点点赞)
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const notificationUserStarPinIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/star/pin`);

/**
 * @description 通知(关注用户)
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const notificationUserAttentionPeopleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/attention/people`);

/**
 * @description 通知(收藏文章)
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const notificationUserCollectionArticleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/notification/user/collection/article`);

/**
 * @description 单聊
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const chatSingleIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/chat/single`);

/**
 * @description 群聊
 * @author ddzy<1766083035@qq.com>
 * @since 2020/1/20
 */
export const chatGroupIOClient = IOClient(`${SOCKET_CONNECTION_INFO.schema}://${SOCKET_CONNECTION_INFO.domain}:${SOCKET_CONNECTION_INFO.port}/chat/group`);