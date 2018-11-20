import * as type from "./type"
import {preURL} from "../../config";
import axios from "axios/index";

export const setArticleMeta = (data) => {
    return {
        type: type.SET_ARTICLE_META,
        data
    }
};
/*
* 将异步请求抽离到 action 的好处：
* 一方面可以抽离组件代码，并且组件之间更方便地共享数据
* 另外一方面可以让请求发送不再被组件生命周期影响，也可以有效节流
* */
export const getAndSetArticleMeta = () => dispatch => {
    return axios.get(`${preURL}/list`).then((response) => {
        console.log('list:', response.data);
        let articleMeta = new Map();
        for(let item of response.data){
            articleMeta.set(item.pathName, item)
        }
        dispatch(setArticleMeta({meta:articleMeta}));
    },(error) => {
        alert('拉取数据失败，请配置后端博客服务！')
    })
};