import React from 'react'
const queryString = require('query-string');
import "./ArticleContent.less"
import axios from "axios/index";
import {preURL, publicURL} from "../config";
import moment from "moment/moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setArticleMeta} from "../redux/action/action";
const ReactMarkdown = require('react-markdown')

class ArticleContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post:{}
        }
    }

    componentDidMount(){
        // const query = queryString.parse(location.search);
        // console.log('pathName:', query);

        // console.log("this.params:",this.params)
        // console.log("this.props.match.params:",this.props.match.params)

        console.log("this.props.articleMetas:", this.props.articleMetas);
        const query = this.props.match.params;

        if(this.props.articleMetas.meta && this.props.articleMetas.meta.has(query.pathName)){
            this.setState({
                post: this.props.articleMetas.meta.get(query.pathName)
            })
        }

        axios.get(`${preURL}/post?pathName=${query.pathName}`).then((response) => {
            console.log(response.data)
            this.setState({
                post:response.data
            })
        },(error) => {
            alert('拉取数据失败，请配置后端博客服务！')
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
                    <ReactMarkdown source={this.state.post._content} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { status, articleMetas } = state
    return { status, articleMetas }
}
const mapDispatchToProps = dispatch => ({
    setArticleMeta:bindActionCreators(setArticleMeta, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)