import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from 'moment'
import { Link } from "react-router-dom";

import "./ArchiveList.less"

class ArchiveList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        // TODO: 初始化
    }

    render(){
        let years = new Set();
        let yearsMap = new Map();

        // 分年月归档信息整理

        return(<div className={"archives-container"}>
            {Array.from(years).map((year, yearIndex) =>
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
    const { status } = state
    return { status }
}
const mapDispatchToProps = dispatch => ({
    // 例如：yourAction:bindActionCreators(yourAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveList)