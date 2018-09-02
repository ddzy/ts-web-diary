## 小学期项目 -- 网络日记网开发
***
## 简介
实时创作发布的交流平台, 采用```react+ts```开发, 项目依赖详见```package.json```,已实现和未完成的功能如下: 
- [x] 登录
- [x] 注册  
- [x] page权限认证
- [x] 首页
- [x] 个人中心
- [x] 创作
  + [x] 撰写文章
    * [x] 权限控制
  + [x] 编辑文章
    * [ ] 权限控制
  + [x] 删除文章
    * [ ] 权限控制 
- [x] 文章列表
  + [x] 点赞
  + [x] 浏览量
  + [ ] 收藏
  + [ ] 评论
- [x] 文章详情
  + [x] 作者信息
  + [x] 文章内容
*** 
> server目录结构
```
...
│  router.js                       // 后台路由配置
│  server.js                       // node服务入口
│  
├─constants                        
│      constants.js               // 全局常量
│      
├─controller                      // 后台controller,与前台路由对应
│      article.js
│      checkAuth.js
│      details.js
│      home.js
│      login.js
│      me.js
│      register.js
│      write.js
│      
├─model                           // MongoDB配置
│      model.js     
│      
├─static                          // 静态资源
│  └─images
│      ├─posts                     
│      └─user                     // 用户头像
│              
└─utils                           // 工具函数
        utils.js
...
```

> src目录结构
```
...

│  Admin.tsx
│  App.tsx
│  global.css
│  index.tsx                       // 项目入口
│  
├─components                       
│  ├─authroute                    // 前端权限控制
│  │      AuthRoute.redux.tsx
│  │      AuthRoute.tsx
│  │      
│  ├─header                       // 公共头部导航栏     
│  │      Header.tsx
│  │      style.tsx
│  │      
│  ├─main                         // 首页 & 文章页通用组件
│  │  │  Main.tsx
│  │  │  style.tsx
│  │  │  
│  │  ├─main_artical
│  │  │      MainArtical.tsx
│  │  │      
│  │  └─main_carousel
│  │          MainCarousel.tsx
│  │          
│  └─write                       // 编辑页 & 发布页通用组件
│      │  style.tsx
│      │  Write.tsx
│      │  
│      ├─write_edit
│      │      WriteEdit.tsx
│      │      
│      ├─write_extra
│      │      WriteExtra.tsx
│      │      
│      └─write_upload
│              WriteUpload.tsx
│              
├─config                         // 全局配置
│      headerNav.config.tsx
│      
├─constants                      // 全局常量
│      constants.tsx
│      
├─pages                          
│  ├─404                         // 404页
│  │      NotFound.tsx
│  │      style.tsx
│  │      
│  ├─article                     // 文章页
│  │      Article.redux.tsx
│  │      Article.tsx
│  │      style.tsx
│  │      
│  ├─details                     // 文章详情页
│  │  │  Details.redux.tsx
│  │  │  Details.tsx
│  │  │  style.tsx
│  │  │  
│  │  ├─details_left
│  │  │      DetailsLeft.tsx
│  │  │      
│  │  └─details_right
│  │          DetailsRight.tsx
│  │          
│  ├─edit                        // 文章编辑页
│  │      Edit.redux.tsx
│  │      Edit.tsx
│  │      
│  ├─home                        // 首页
│  │      Home.redux.tsx
│  │      Home.tsx
│  │      style.tsx
│  │      
│  ├─login                       // 登录页
│  │      Login.redux.tsx
│  │      Login.tsx
│  │      style.tsx
│  │      
│  ├─me                          // 个人中心
│  │  │  Me.redux.tsx
│  │  │  Me.tsx
│  │  │  style.tsx
│  │  │  
│  │  ├─me_article
│  │  │      MeArticle.tsx
│  │  │      MeArticleList.tsx
│  │  │      
│  │  └─me_info
│  │          MeInfo.tsx
│  │          
│  ├─publish                     // 发表文章
│  │      Publish.redux.tsx
│  │      Publish.tsx
│  │      
│  └─register                    // 注册
│          Register.redux.tsx
│          Register.tsx
│          style.tsx
│          
├─redux                          // 全局reducer
│      configureStore.tsx
│      reducers.tsx
│      
├─router                         // 路由配置
│      router.tsx
│      
├─services                       // axios配置
│      request.tsx
│      
├─static                         // 静态资源
│  └─images
│          
└─utils                          // 工具函数
        utils.tsx
...
```

## 用法
### 后台
```
cd ./server && nodemon server.js
```
### 前台
```
npm start
```
