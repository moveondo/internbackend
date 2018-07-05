# 印尼项目后台管理 #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案。

## 前言 ##

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单

## 目录结构介绍 ##

    .
    ├── README.md
    ├── build
    │   ├── build.js
    │   ├── check-versions.js
    │   ├── dev-client.js
    │   ├── dev-server.js
    │   ├── utils.js
    │   ├── vendor-manifest.json
    │   ├── vue-loader.conf.js
    │   ├── webpack.base.conf.js
    │   ├── webpack.dev.conf.js
    │   ├── webpack.dll.conf.js
    │   └── webpack.prod.conf.js
    ├── config
    │   ├── dev.env.js
    │   ├── index.js
    │   └── prod.env.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── screenshots
    │   ├── wms1.png
    │   └── wms2.png
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   │   ├── indonesia.json
    │   │   └── logo.png
    │   ├── components
    │   │   ├── common
    │   │   ├── page
    │   │   ├── project
    │   │   └── project2
    │   ├── i18n
    │   │   ├── cookie.js
    │   │   ├── i18n.js
    │   │   └── langs
    │   ├── main.js
    │   ├── router
    │   │   └── index.js
    │   ├── store
    │   │   └── index.js
    │   └── utils
    │       └── http.js
    ├── static
    │   ├── css
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

## 安装步骤 ##
```
  git clone https://github.com/lin-xin/manage-system.git      // 把模板下载到本地
  cd manage-system    // 进入模板目录
  npm install         // 安装项目依赖，等待安装完成之后
```
## 本地开发 ##

  // 开启服务器，浏览器访问 http://localhost:8080
  npm run dev

## 构建生产 ##
```
  // 执行构建命令，生成的dist文件夹放在服务器下即可访问
  npm run build
```