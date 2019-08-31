// ? 申请加好友的数据模型
export interface IBaseNoficationUserFriendRequestParams {
  _id: string;
  agree_state: -1 | 0 | 1;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  };
  to: {
    _id: string,
    username: string,
    useravatar: string,
  };
  description: string;
  create_time: number;
  update_time: number;
};

// ? 同意加好友的数据模型
export interface IBaseNotificationUserFriendAgreeParams {
  _id: string;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  },
  to: {
    _id: string,
    username: string,
    useravatar: string,
  },
  create_time: number;
  update_time: number;
};

// ? 拒绝加好友的数据模型
export interface IBaseNotificationUserFriendRefuseParams {
  _id: string;
  from: {
    _id: string,
    username: string,
    useravatar: string,
  };
  to: {
    _id: string,
    username: string,
    useravatar: string,
  };
  description: string;
  create_time: number;
  update_time: number;
};