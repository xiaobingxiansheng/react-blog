import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from 'moment'
import { Link } from "react-router-dom";
import  { getArticleList as fetchListAction}  from "../redux/action/action"

import "./ArchiveList.less"

class ArchiveList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        // TODO: 初始化
        if(this.props.years.size <= 0 || this.props.yearsMap.size <= 0){
            this.props.fetchList();
        }
    }

    render(){
        let years = this.props.years;
        let yearsMap = this.props.yearsMap;

        // 分年月归档信息整理

        return(<div className={"archives-container"}>
            {Array.from(years).sort().reverse().map((year, yearIndex) =>
                <div className={"one-tag-list"} key={yearIndex}>

                    <span className={"fa fa-calendar-times-o listing-seperator"}>
                        <span className={"tag-text"}>{year}</span>
                    </span>

                    <ul>
                        {yearsMap.get(year).map((item, index) =>
                            <li key={index}>
                                <span>{moment(item.date).format('MM-DD')}</span>
                                <i className="fa fa-angle-double-right" aria-hidden="true" />
                                <Link to={'/article/' + item.pathName}>
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

            )}
        </div>)
    }
}

const mapStateToProps = (state) => {
    const { status, fetchList: { data } } = state
    const years = new Set();
    const yearsMap = new Map();
    for(var [index, idata] of data){
        var computedYear = new Date(idata.date).getFullYear();
        years.add(computedYear)
        if(yearsMap.has(computedYear)){
            yearsMap.set(computedYear, yearsMap.get(computedYear).concat([idata]));
        }else{
            yearsMap.set(computedYear, [idata])
        }
    }
    return { status , years , yearsMap }
}
const mapDispatchToProps = dispatch => ({
    // 例如：yourAction:bindActionCreators(yourAction, dispatch),
    fetchList: bindActionCreators(fetchListAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveList)