import {
    combineReducers
} from "redux"
import * as type from "../action/type"
import { fetchList } from "./fetchList";
const status = (state = { status: 200 }, action) => {
    switch (action.type) {
        default: return {
            ...state
        }
    }
};

let defaultMeta = new Map(); // 可以使用其做为默认

/* TODO AND TIP:

这里我们需要定义使用的 Reducer，这里已经给出了一个 reducer 的例子，之后可以使用 combineReducers 进行 export

 */
export default combineReducers({
    status,
    fetchList
    // More
})