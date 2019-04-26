import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Link } from "react-router-dom";
import  { getArticleList as fetchListAction}  from "../redux/action/action"

import './TagList.less'

class TagList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
       // TODO: 判断以及初始化
       if(this.props.tags.size <= 0 || this.props.tagKeys.size <= 0){
           this.props.fetchList();
       }
    }

    render(){

        let tags = this.props.tags;
        

        let tagKeys = this.props.tagKeys;

        // TODO: 设定 tags 和 tagKeys
        console.log(this.props.tagKeys);

        return (<div>
            <div id='tag_cloud' className="tags">
                {Array.from(tagKeys).map((tagKey, keyIndex) =>
                    <a key={keyIndex}>{tagKey}</a>
                )}
            </div>

            {Array.from(tagKeys).map((tagKey, keyIndex) =>
                <div className={'one-tag-list'} key={keyIndex}>
                    <span className="fa fa-tag listing-seperator" id={keyIndex}>
                        <span className="tag-text">{tagKey}</span>
                    </span>
                    {tags.get(tagKey).map((item, itemIndex) =>
                        <div className={'post-preview'} key={itemIndex}>
                            <Link to={'/article/' + item.pathName}>
                                <h2 className={'post-title'}>
                                    {item.title}
                                </h2>
                            </Link>
                        </div>
                    )}
                </div>
            )}

        </div>)

    }
}

const mapStateToProps = (state) => {
    const { status, fetchList:{data} } = state
    const tags = new Map();
    const tagKeys = new Set();
    for(var [index, idata] of data){
        idata.tags.forEach((innerTag, index)=>{
            tagKeys.add(innerTag)
            if(tags.has(innerTag)){
                tags.set(innerTag, tags.get(innerTag).concat([idata]));
            }else{
                tags.set(innerTag, [idata])
            }
        })
    }
    return { status , tagKeys , tags}
}
const mapDispatchToProps = dispatch => ({
    // 例如：yourAction:bindActionCreators(yourAction, dispatch),
    fetchList: bindActionCreators(fetchListAction, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(TagList)