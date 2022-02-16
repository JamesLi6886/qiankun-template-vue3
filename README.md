# qiankun微服务架构模板-主应用采用vue3框架
### 可以兼容vue3和vue2以及没有采用umijs的reactjs项目

## 配置前端的npm仓库（非必须， 如果公司有自己的npm仓库的时候使用）
```
npm config set registry http://xxx.xxx.xx.xx:xxxx/repository/npm-group
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
## 如果需要添加公共的依赖可以参考一下命令

添加subtree （其中master为公共依赖仓库的分支名）
```
git subtree add --prefix=common http://xxx.xx.xx.xx:xxx/data-platform-frontend-dev/common.git master --squash
```
拉取最新的代码
```
git subtree pull --prefix=common http://xxx.xx.xx.xx:xxx/data-platform-frontend-dev/common.git master --squash
```
在子项目中推送到主项目中
```
git subtree push --prefix=common http://xxx.xx.xx.xx:xxx/data-platform-frontend-dev/common.git master
```

