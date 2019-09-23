/**
 * 沸点列表信息的公共接口
 */
export interface ICommonBasePinItemInfo {
  _id: string,
  author_id: {
    _id: string,
    username: string,
    useravatar: string,
    introduction: string,
    website: string,
    job: string,
  },
  topic_id: {
    _id: string,
    name: string,
  },
  content_plain: string,
  content_image: Array<{
    originUrl: string,
    processedUrl: string,
  }>,
  content_link: {
    title: string,
    domain: string,
    coverImgUrl: string,
  },
  create_time: number,
  update_time: number,
  user_is_attention: boolean,
  user_is_current_author: boolean,
  user_is_friend: boolean,
};