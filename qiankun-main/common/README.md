#子模块使用说明：
在需要子模块的项目目录下运行

添加subtree
```
git subtree add --prefix=common http://xxx.xxx.xxx.xxx:xxxx/data-platform-frontend-dev/common.git master --squash
```
拉去最新的代码
```
git subtree pull --prefix=common http://xxx.xxx.xxx.xxx:xxxx/data-platform-frontend-dev/common.git master --squash
```
在子项目中推送到主项目中
```
git subtree push --prefix=common http://xxx.xxx.xxx.xxx:xxxx/data-platform-frontend-dev/common.git master
```
