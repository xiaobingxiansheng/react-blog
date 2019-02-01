import React from 'react';
import './NoMatch.less'

export default class NoMatch extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="noMatchContent">
        <div className="headImg"></div>
        <p>
          您访问的网页被外星人偷走了... 去联系管理员进行救援！
        </p>
      </div>
    )
  }
}