/**
 * 话题基本信息接口
 */
export interface IBaseCommonTopicInfo {
  _id: string;
  cover_img: string;
  name: string;
  description: string;
  pins: string[];
  followers: string[];
  create_time: number;
  update_time: number;
  is_attention: boolean;
};