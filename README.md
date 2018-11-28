## 实时发布文章的交流平台
## Tip
> 最近更新于 18/11/28
## Todo
> bug解决
> px-to-rem | 评论回复组件提取 | redis
## Description
实时创作发布的交流平台, 采用```react+ts```开发,已实现和未完成的功能如下: 
- [x] 登录页
- [x] 注册页  
- [x] 前台路由
  + [x] jwt权限认证
- [x] 首页
  + [x] 新闻展示
- [x] 个人中心页
  + [x] 我的信息
    * [x] 更换头像
  + [x] 我的文章
    * [x] 分类
    * [x] 编辑
    * [x] 删除
  + [x] 我的收藏
    * [x] 分类
    * [x] 删除
- [x] 创作页
  + [x] 撰写文章
- [x] 文章页
  + [x] 点赞
  + [x] 浏览量
  + [x] 收藏
    + [x] 收藏夹
    + [x] 分类
- [x] 收藏详情页
  + [x] 收藏文章列表
  + [x] 删除已收藏文章
- [x] 文章详情页
  + [x] 作者信息
  + [x] 文章内容
  + [x] 评论
  + [x] 回复
  + [x] 点赞 
## Usage
1. npm install   
2. cd node_modules/tslint/config/, 编辑```recommend.js```  
  + object-literal-sort-keys => false  
  + no-bitwise => false  
3. 开启项目  
  + npm start  
4. 启动服务器
  + cd server/ && nodemon server.js  