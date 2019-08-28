// ? 应用用户基本信息接口
export interface ICommonBaseUserInfo {
  _id: string,
  username: string,
  useravatar: string,
};

// ? 文章基本信息接口
export interface ICommonBaseArticleInfo {
  _id: string,
  // 文章的作者
  author: ICommonBaseUserInfo,
  // 文章下的评论
  comments: ICommonBaseArticleCommentInfo[],
  // 文章创建时间
  create_time: number,
  // 文章的封面主题图片
  cover_img: string,
  // 文章的更新时间
  update_time: number,
  // 文章的模式
  mode: string,
  // 文章的分类
  type: string,
  // 文章的标签
  tag: string,
  // 文章的标题
  title: string,
  // 文章的描述
  description: string,
  // 文章的内容
  content: string,
  // 看过文章的用户
  watched_user: ICommonBaseUserInfo[],
  // 收藏过文章的用户
  collected_user: ICommonBaseUserInfo[],
};

// ? 文章评论基本信息接口
export interface ICommonBaseArticleCommentInfo {
  _id: string,
  // 评论人
  from: ICommonBaseUserInfo,
  // 评论的普通文本内容
  content_plain: string,
  // 评论的图片内容
  content_image: string[],
  // 评论的文章
  article: ICommonBaseArticleInfo,
  // 评论创建的时间
  create_time: number,
  // 评论更新的时间
  update_time: number,
  // 该评论下的回复
  replys: []
};

// ? 文章评论的回复基本信息接口
export interface ICommonBaseArticleCommentReplyInfo {
  _id: string,
  // 回复的创建者
  from: ICommonBaseUserInfo,
  // 回复的对象
  to: ICommonBaseUserInfo,
  // 回复所属的文章
  article: ICommonBaseArticleInfo,
  // 回复所属的评论
  comment: ICommonBaseArticleCommentInfo,
  // 评论的普通文本内容
  content_plain: string,
  // 评论的图片内容
  content_image: string[],
  // 回复的创建时间
  create_time: number,
  // 回复的更新时间
  update_time: number,
};