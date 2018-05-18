/**
*
* CitemNews
*
*/

import React from 'react';
import styles from './styles';
import { Row, Col, Button, Icon } from 'antd';


class CitemNews extends React.Component {
  viewDetailNews(){
    this.props.viewNewsDetail(this.props.data.id)
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
    return result;
  }
  render() {
    let title = "";
    let desc = "";
    let image = require('containers/App/maxresdefault.jpg');
    let date = "";
    if(this.props.data){
      title = this.props.data.title;
      desc = this.props.data.shortDescription;
      if(this.props.data.image!==null){
        let index = this.props.data.image.indexOf("upload/")+7;
        image = this.props.data.image.substring(0,index)+"q_20/"+this.props.data.image.substring(index);
      }
      // image = this.props.data.image;
      date = this.props.data.timeCreate;
    }
    return (
      <div style={styles.wrapItem}>
        <div style={{display: 'flex'}}>
          <div style={{flexBasis: 85}}>
            <img src={image} id="imgstore" width='85px' height='60px' />
          </div>
          <div style={{flex: 1}}>
            <div onClick={()=>this.viewDetailNews()} style={styles.showTitle}>{title}</div>
            <div style={styles.showDate}>{`Ngày cập nhật: ${this.convertTime(date)}`}</div>
          </div>
        </div>
        <div>
          <div style={styles.showDesc}>{desc}</div>
        </div>
      </div>
    );
  }
}

CitemNews.propTypes = {

};

export default CitemNews;
