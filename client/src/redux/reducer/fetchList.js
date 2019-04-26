import { REQUEST_ARTICLELIST_DATA } from "../action/type"

export const fetchList = (state = {
  data:new Map,
  errorMsg: "" ,
  isLoadding: true
}, action) => {
  switch (action.type) {
      case REQUEST_ARTICLELIST_DATA:{
        if(action.payload.status === "success"){
          return {
            ...state,
            data: action.payload.data,
            isLoadding: false
          }
        }else if(action.payload.status === "failed"){
          return {
            ...state,
            errorMsg: action.payload.errorMsg,
            isLoadding: false
          }
        }else{
          return {
            ...state,
            isLoadding: true
          }
        }
      }
      default: return {
          ...state
      }
  }
};