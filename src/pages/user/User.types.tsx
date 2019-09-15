/**
 * 用户的个人基本信息接口
 */
export interface IBaseCommonUserProfileInfo {
  _id: string;
  username: string;
  usergender: string;
  useravatar: string;
  profile_cover_img: string;
  address: string;
  website: string;
  introduction: string;
  job: string;
  education: string;
};