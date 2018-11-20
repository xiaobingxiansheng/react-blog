import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getAndSetArticleMeta, setArticleMeta} from "../redux/action/action";
import { Link } from "react-router-dom";

import './TagList.less'

class TagList extends React.Component{
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

        let tags = new Map();
        let tagKeys = new Set();

        for (let value of this.props.articleMetas.meta.values()) {
            for(let tag of value.tags){
                tagKeys.add(tag)
                if(tags.has(tag)){
                    tags.set(tag, tags.get(tag).concat([value]))
                } else {
                    tags.set(tag, [value])
                }
            }
        }

        console.log('tags:', tags);
        console.log('tagKeys:', tagKeys);

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
    const { status, articleMetas } = state
    return { status, articleMetas }
}
const mapDispatchToProps = dispatch => ({
    setArticleMeta:bindActionCreators(setArticleMeta, dispatch),
    getAndSetArticleMeta:bindActionCreators(getAndSetArticleMeta, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TagList)