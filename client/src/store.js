// store 的样例代码 可直接使用
import thunk from "redux-thunk"
import { createStore, applyMiddleware, compose } from "redux"
import reducer from "./redux/reducer/index"

// redux 注入操作
const middleware = [thunk]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(...middleware)))

export default store