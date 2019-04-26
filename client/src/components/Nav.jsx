import React from 'react'
import ClassNames from 'classnames'
import './Nav.less'
import { Link } from "react-router-dom";

import { withRouter } from 'react-router'

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.isMatchRouterPathName = this.isMatchRouterPathName.bind(this);
    }

    componentDidMount(){
        console.log('nav props:', this.props);
    }

    //  判断路由路径是否是对应入参路径
    isMatchRouterPathName(pathName){
        return this.props.location.pathname.indexOf(pathName) > -1;
    }

    render(){
        return(
            <div className="nav" id="nav">
                <div className="avatar-name">
                    <div className="avatar">
                        <img src={require('../resource/avatar.jpg')} />
                    </div>
                    <div className="name">
                        <i>
                            iconie
                        </i>
                    </div>
                </div>
                <div className="contents" id="nav-content">
                    <ul>
                        <li className={ClassNames({'active': this.isMatchRouterPathName('/articleList')})}>
                            <Link to={'/articleList'}>
                                <i className="iconfont icon-shouye1"></i>
                                <span>首页</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.isMatchRouterPathName('/tagList')})}>
                            <Link to={'/tagList'}>
                                <i className="iconfont icon-biaoqian1"></i>
                                <span>标签</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.isMatchRouterPathName('/archive')})}>
                            <Link to={'/archive'}>
                                <i className="iconfont icon-guidang1"></i>
                                <span>归档</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.isMatchRouterPathName('/about')})}>
                            <Link to={'/about'}>
                                <i className="iconfont icon-guanyu1"></i>
                                <span>关于</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.isMatchRouterPathName('/feedback')})}>
                            <Link to={'/feedback'}>
                                <i className="iconfont icon-guanyu1"></i>
                                <span>反馈</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Nav)