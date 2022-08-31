
### 开发

yarn dev
http://ff-dev.bilibili.co?_port_=3000&_apiEnv_=uat


### 发布

```bash
# 测试: https://ff-beta-proxy.bilibili.com/
# uat-tianshu.bilibili.co/feedback 试试用的脚本是  feedback-sdk.test.js
yarn build:test

# 构建production但只会发布到uat-s1.hdslb.com, 需要开host验证
yarn build

# 验证成功后发线上： 发布到s1.hdslb.com
yarn upload
```