# 构建基于 React-Router 和 Redux 的单页面博客应用

本次项目对应的是第五章和第六章的课程内容，本次项目的主要目标是使用 React-Router 重构原来的多页面应用变成单页面应用，并且为应用接入 Redux 进行数据传递和管理。

## 项目说明

本次项目需要的后端数据接口和上一次的相同，如果之前已经启动过 `my-react-blog-backend`，则按照之前的启动方式继续启动即可，这里再次重复一遍启动命令：

```
cd my-react-blog-backend

npm install

npm start
```

之后，我们需要保证在后端接口已经启动的情况下进行前端开发。

和其他几次不同的是，本次项目的内容如果直接启动，是几乎没有效果的，大多数内容需要由学员自行完成。

## 目录结构

```
├── .babelrc babel配置文件
├── webpack.config.js webpack配置文件
├── index.html html模版文件
├── package.json  
└── src
 	├── index.jsx 单页面应用项目入口文件
 	├── store.js Redux-store 文件
	├── components 展示类组件
	├── container 容器布局类组件
	├── config 配置文件
	├── resource 资源文件夹
	├── style 样式文件
	├── router 路由文件
	└── redux redux 文件
	    ├── action Redux-action 文件
	    └── reducer Redux-reducer 文件
```

本次目录结构和项目代码变更较大，主要增加了 Redux 和  React-Router 相关的文件夹，同时移除了之前的 pages 文件夹。另外，为了适当减少学习复杂性，提高需求专注度，我们本次暂时移除了上一部分使用 Context 相关 API 配置项目主题的代码。

## 具体要求

本阶段要求大家完成以下几个任务：

### 重构博客目录结构和 webpack 相关配置，完成使用 React-Router 进行路由管理

首先我们需要在 src 目录下建立一个新的 index.jsx 作为入口文件，并且修改 webpack 配置，使原来的多入口变成单一入口。

同时，我们需要新建 router 文件夹并新建 index.jsx 文件，用于配置路由，为了方便起见，我们直接引用 components 文件夹下的展示组件（实际上，我们也可以将路由引用的展示组件作为顶层页面组件）。

### 为项目接入 Redux

Redux 的接入主要工作为实现三部分内容：action、reducer 和 store。这里我们建议将 action 和 reducer 放置在单独的 redux 文件夹下，而将 store.js 作为单独的文件直接放在 src 文件夹下，方便引入。

接入 Redux 之后，我们将文章列表获取的相关处理逻辑放在 Redux 中进行处理，我们需要对使用相关数据的组件用 `connect` 进行包装。

我们接入 Redux 的目的，是为了在列表页和文章详情页之间进行统一的数据流管理和传递，这样给我们的一个好处是，如果我们从列表页点击进入详情页之后，可以先在详情页展示一些列表页的元信息数据（例如标题、标签、发表时间等），从而一定程度上防止内容没有加载导致的空白，来优化项目体验。（注意：由于文章本身内容较多，所以我们在列表页应该避免加载文章内容本身）。

这部分的整体逻辑较为复杂，虽然项目本身提供了部分样例代码和提示，但是如果没有相关的实际使用经验，还是会有很大的挑战性，所以，笔者建议大家可以先行查找相关资料（例如：[Redux中文文档](https://github.com/camsong/redux-in-chinese)）,等到对 Redux 有了一个初步认识之后，再来学习项目中接入 redux 的具体实现。

### 完善博客的其他页面

实际上，在我们的前几次项目中，主要都是对博客的主页文章列表、文章详情页、反馈页进行开发，而文章标签集合、归档页面、关于页面等还是为空的。

在前几次的实践中因为这几个页面并不影响主流程，所以我们并未对此进行过多关注，而现在我们的项目已经趋于完善，读者可以自行完善相关的页面，当然，这部分我们在项目示例代码中也已经部分给出。

## 总结

本次内容，我们使用 React-Router 和 Redux 进一步丰富了我们的博客项目，实际上，截止当前，我们的项目已经是一个可以向生产环境部署的客户端渲染的项目了，如果大家对 SEO 等没有需求，可以直接拿此阶段的项目作为自己的学习成果，并且尝试将博客发布出去。


