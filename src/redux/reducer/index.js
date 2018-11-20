import {
    combineReducers
} from "redux"
import * as type from "../action/type"

const status = (state = { status: 200 }, action) => {
    switch (action.type) {
        default: return {
            ...state
        }
    }
};

let defaultMeta = new Map();

const articleMetas = (state = {meta :defaultMeta}, action) => {
      switch (action.type){
          case type.SET_ARTICLE_META:
              return {
                  ...state,
                  ...action.data,
              };
          default: return {
              ...state
          }
      }
};

export default combineReducers({
    status,
    articleMetas,
})