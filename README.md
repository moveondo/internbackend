
基于Vue.js 2.x系列 + Element UI + i8n的中印管理后台

## 前言 ##

此系统是一款基于Vue.js 2.x系列 + Element UI + i8n的中印尼语的管理后台

## 功能 ##

- [x] 登录/注销
- [x] 审核相关功能
- [x] 资金处理相关
- [x] 业务相关功能
- [x] 个人信息查看
- [x] 权限管理


### 技术栈

前端：html、css、less、ES6、webpack、vue-cli、vue2、vuex、vue-router、vue-resource

Vue2：采用最新Vue2的语法

Vuex：实现不同组件之间的状态共享

vue-router：单页应用路由管理必备

axios：发起http请求

LESS：css预处理语言

Webpack：自动化构建工具，大部分配置vue-cli脚手架已经弄好了，很方便.

ES6：采用ES6语法，这是趋势。

localStorage(HTML5)：本地存储，保存用户个性化设置。

CSS3：CSS3动画及样式。

### 项目运行方法

#### 注：前端使用ES6的很多新特性，所以NodeJs 必须是6.0稳定版本，我使用的版本是8.9.0

（1）git clone https://github.com/moveondo/internbackend.git

（2）npm install

（3）npm run dev

 (4)npm run build


### 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

开发环境 WIN7、Chrome 、nodejs 8.9.0

#### 注：此项目纯属个人爱好，代码测试及学习使用，不用做任何商业活动。


>  vue-cli 入门建议参考 [基于VUE2.5仿天猫移动端首页的SPA](https://github.com/moveondo/VUE-Taobao)

>  node爬虫建议参考 [node+ejs爬上海链家房屋价格(张江地区租房)信息,promise,eventproxy,express,koa框架使用](https://github.com/moveondo/nodeJs-Reptile)  

> node框架express，koa 建议参考[nodejs框架-Express,Koa](https://github.com/moveondo/NodeJsFrame)


> vue + element-ui 的后台管理系统 建议参考 [ vue + element-ui 的后台管理系统](https://github.com/moveondo/vue-ManageSystem)

> 如果你想学习socket 建议参考 [vue全家桶+node.js+socket打造的智能聊天及新闻社区](https://github.com/moveondo/CloudNews)


### 目录结构

<pre>
├── build			// webpack及Node相关配置
├── config			// 项目dev和prod环境的配置
├── dist			// 项目build打包之后的目录
├── node_modules		// npm包
├── index.html			// 项目入口文件
├── package.json		// 项目描述文件
├── peoject.gif			// 项目GIF图
├── php_test			// 用PHP代替Node实现首页数据接口示例
├── src
  │   ├── App.vue
  │   ├── assets             //印尼地区json  
  │   │   ├── indonesia.json
  │   │   └── logo.png
  │   ├── components         //组件
  │   │   ├── common
  │   │   ├── page
  │   │   ├── project
  │   │   └── project2
  │   ├── i18n             //国际化语言包
  │   │   ├── cookie.js    
  │   │   ├── i18n.js
  │   │   └── langs
  │   ├── main.js
  │   ├── router             //路由
  │   │   └── index.js
  │   ├── store             //vuex
  │   │   └── index.js
  │   └── utils             //封装http请求
  │       └── http.js
  ├── static                //静态文件
  │   ├── css
  │   │   ├── color-dark.css
  │   │   ├── datasource.css
  │   │   ├── main.css
  │   │   └── theme-green
  │   ├── img
  │   │   ├── img.jpg
  │   │   └── logo.png
  │   └── js
  │       └── vendor.dll.js
  └── yarn.lock
├── .babelrc			// ES6等babel的一些配置
├── .editorconfig		// 编辑器的一些配置
├── .eslintignore		// 忽略语法检查的目录文件，一般是忽略build和config目录
├── .eslintrc.js		// eslint的配置文件
├── 
</pre>


#### 注：此项目纯属个人爱好及代码测试
