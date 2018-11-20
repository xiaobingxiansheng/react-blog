import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getAndSetArticleMeta, setArticleMeta} from "../redux/action/action";

class AboutMe extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
        <div className="post-content">

            这里有一个自我介绍

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

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe)