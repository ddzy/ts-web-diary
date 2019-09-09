# ts-web-diary

## 说明

毕设项目`第三版`,  正在大力开发`聊天室`模块🚧.

最近更新于`2019/9/8`

完成:

- [x] 集成github登录
  - [x] 完成第一步, 前台请求授权, 接收`code`, 发送至后台, 正常获取到用户的`github`信息

TODO:

- [ ] 集成github登录
  - [ ] 需要根据openid, 来判断该账号是否绑定, 并作响应的处理
  - [ ] 创建对应的OauthGithub表, 来保存用户和绑定的github账号之间的映射关系

## 用法

### Server

```bash
npm run server
```

### Client

```bash
npm run start
```

**Enjoy!**