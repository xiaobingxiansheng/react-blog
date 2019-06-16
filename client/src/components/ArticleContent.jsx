import React from 'react'
const queryString = require('query-string');
import "./ArticleContent.less"
import axios from "axios/index";
import {preURL, publicURL} from "../config";
import moment from "moment/moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
const ReactMarkdown = require('react-markdown')

class ArticleContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post:{}
        }
    }

    componentDidMount(){
        
        const query = this.props.match.params;
        const propsPostMeta = this.props.propsPostMeta;
        console.log(propsPostMeta);
        // TODO: 可以先采用 redux 中的信息
        this.setState({
            post:Object.assign({}, this.state.post, {
                ...propsPostMeta
            })
        })

        axios.get(`${preURL}/post?pathName=${query.pathName}`).then((response) => {
            console.log("state", this.state)
            setTimeout(()=>{
                this.setState({
                    post:Object.assign({}, this.state.post, {
                        ...response.data
                    })
                })
            }, 2000)
        },(error) => {
            alert('拉取数据失败，请配置后端博客服务！')
            this.setState({
                post:Object.assign({}, this.state.post, {
                    _content: '拉取数据失败，请配置后端博客服务！' 
                })
            })
        })
    }

    render(){
        return(
            <div className={'post-container'}>

                <div className={'post-title'}>
                    {this.state.post.title}
                </div>

                <div className={'post-meta'}>

                    <span className={'attr'}>
                        发布于：
                        {moment(this.state.post.date).format('YYYY-MM-DD hh:mm:ss')}
                    </span>

                    <span className={'attr'}>
                        标签：/
                        {(this.state.post.tags || []).map((item, index) =>
                            " " + item + " /"
                        )}
                    </span>

                    <span className={'attr'}>
                        访问：

                    </span>

                </div>


                <div className={'post-content'}>
                    {this.state.post._content?<ReactMarkdown source={this.state.post._content} />:"加载中..."}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { status, fetchList:{ data } } = state;
    
    // return { status, data.get(ownProps.match.params.pathName)};
    return { status, propsPostMeta:data.get(ownProps.match.params.pathName), data};
}
const mapDispatchToProps = dispatch => ({
    // 例如：yourAction:bindActionCreators(yourAction, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)