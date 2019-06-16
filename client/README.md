# 构建基于 React-Router 和 Redux 的单页面博客应用

主要目标是使用 React-Router 重构原来的多页面应用变成单页面应用，并且为应用接入 Redux 进行数据传递和管理。

## 项目说明
项目为了方便管理，前后端都放在同一个仓库里，在clone下来的时候，要分别运行前端和后端的服务，需要执行以下操作:
```
cd client

npm install

npm start

cd server

npm install

npm start
```

## 目录结构

```
├── .babelrc babel配置文件
├── webpack.config.js webpack配置文件
├── index.html html模版文件
├── package.json  
└── src
 	├── index.jsx 单页面应用项目入口文件
 	├── store.js Redux-store文件
	├── components 展示类组件
	├── container 容器布局类组件
	├── config 配置文件
	├── resource 资源文件夹
	├── style 样式文件
	├── router 路由文件
	└── redux redux文件
	    ├── action Redux-action文件
	    └── reducer Redux-reducer文件
```


