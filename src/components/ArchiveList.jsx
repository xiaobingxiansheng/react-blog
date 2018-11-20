import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from 'moment'
import { Link } from "react-router-dom";
import {getAndSetArticleMeta, setArticleMeta} from "../redux/action/action";

import "./ArchiveList.less"

class ArchiveList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        if(!this.props.articleMetas.meta || !this.props.articleMetas.meta.size) {
            this.props.getAndSetArticleMeta();
        }
    }

    render(){
        let years = new Set();
        let yearsMap = new Map();

        for (let value of this.props.articleMetas.meta.values()) {
            let momentDate = moment(value.date);
            let year = momentDate.format('YYYY');
            years.add(year);
            if(yearsMap.has(year)){
                console.log("yearsMap.get(year):",yearsMap.get(year),yearsMap.has(year),year,yearsMap)
                yearsMap.set(year, yearsMap.get(year).concat([value]))
            } else {
                yearsMap.set(year,[value]);
                console.log('set:', yearsMap)
            }
        }

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
    const { status, articleMetas } = state
    return { status, articleMetas }
}
const mapDispatchToProps = dispatch => ({
    setArticleMeta:bindActionCreators(setArticleMeta, dispatch),
    getAndSetArticleMeta:bindActionCreators(getAndSetArticleMeta, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveList)