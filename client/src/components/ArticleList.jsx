import React from 'react'
import axios from 'axios'
import { preURL, publicURL } from "../config"
import moment from 'moment'
import ClassNames from 'classnames'
import './ArticleList.less'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import  { getArticleList as fetchListAction}  from "../redux/action/action"
import { bindActionCreators } from "redux"
import NoMatch from "../components/NoMatch";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            pageIndex:0,
            pageSize: 8
        }
        this.computerPageRange = this.computerPageRange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            list: [...nextProps.list.data.values()],
            pageIndex: +nextProps.match.params.pageIndex
        };
    }

    componentDidMount(){
        // TODO：拉取数据
        this.props.fetchList();
    }


    // 计算列表显示范围
    computerPageRange(){
        const MAX_COUNT_LENGTH = this.state.list.length;
        let { pageIndex } = this.props.match.params;
        let firstPage = pageIndex * this.state.pageSize;
        let endPage = Math.min(firstPage + this.state.pageSize, MAX_COUNT_LENGTH);
        console.log(firstPage, endPage)
        return {firstPage, endPage};
        // let endPage = 
    }

    render() {

        let computerPageRangeObj = this.computerPageRange()
        let list = this.state.list.slice(computerPageRangeObj.firstPage, computerPageRangeObj.endPage);
        // console.log(list)
        // // TODO： 设定 list
        return (

            list.length>0?<div>
                <div className="post-preview-container">
                    {list.map((item, index) =>
                        <div className={"post-preview"} key={index}>
                            <div className={"post-time"}>
                                {moment(item.date).format('YYYY-MM-DD')}
                            </div>
                            <div className={"post-info"}>
                                <Link to={'/article/' + item.pathName}>
                                    <h3>
                                        {item.title}
                                    </h3>
                                </Link>
                                <p>
                                    <span>/</span>
                                    {item.tags.map((tag, tagIndex) =>
                                        <span key={tag + tagIndex}> {tag} /</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <ul className={'pager'} >
                    {/* <li className={ClassNames("previous",{'hidden': this.state.begin === 0})} onClick={() => {this.lastPage()}}> */}
                    <li className={ClassNames("previous", {'hidden': this.state.pageIndex == 0})}>
                        <Link  to={'./'+(this.state.pageIndex-1)}>&larr; Newer Posts</Link>
                    </li>

                    {/* <li className={ClassNames("next",{'hidden': this.state.begin + this.state.pageSize >= list.length })}  onClick={() => {this.nextPage()}}> */}
                    <li className={ClassNames("next",{'hidden': computerPageRangeObj.endPage >= this.state.list.length })}>
                        <Link to={'./'+(this.state.pageIndex+1)}>Older Posts &rarr;</Link>
                    </li>
                </ul>
            </div>:(this.props.list.isLoadding?<div className="post-preview-container">加载中..</div>:<NoMatch />)
        )
    }
}

const mapStateToProps = (state) => {
    const { status, fetchList: list} = state
    return { status, list}
}
const mapDispatchToProps = dispatch => ({
    // 例如：yourAction:bindActionCreators(yourAction, dispatch),
    fetchList: bindActionCreators(fetchListAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)