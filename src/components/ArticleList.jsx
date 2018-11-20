import React from 'react'
import axios from 'axios'
import { preURL, publicURL } from "../config"
import moment from 'moment'
import ClassNames from 'classnames'
import './ArticleList.less'
import { Link } from "react-router-dom";
import {connect} from "react-redux";

import { bindActionCreators } from "redux"
import { setArticleMeta, getAndSetArticleMeta } from '../redux/action/action'

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            begin:0,
            pageSize: 8,
        }
    }

    componentDidMount(){
        if(!this.props.articleMetas.meta || !this.props.articleMetas.meta.size) {
            this.props.getAndSetArticleMeta();
        }
    }

    nextPage(){
        this.setState({
            begin: this.state.begin + this.state.pageSize
        })
    }

    lastPage(){
        this.setState({
            begin: this.state.begin - this.state.pageSize
        })
    }

    render() {

        let list = []

        for (let value of this.props.articleMetas.meta.values()) {
            list.push(value)
        }

        return (
            <div>
                <div className="post-preview-container">
                    {list.slice(this.state.begin, this.state.begin + this.state.pageSize).map((item, index) =>
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
                    <li className={ClassNames("previous",{'hidden': this.state.begin === 0})} onClick={() => {this.lastPage()}}>
                        <a>&larr; Newer Posts</a>
                    </li>

                    <li  className={ClassNames("next",{'hidden': this.state.begin + this.state.pageSize >= list.length })}  onClick={() => {this.nextPage()}}>
                        <a>Older Posts &rarr;</a>
                    </li>
                </ul>
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
    getAndSetArticleMeta:bindActionCreators(getAndSetArticleMeta, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)