
import React from 'react';
import styles from './styles';
import { Row, Col, Button, Icon } from 'antd';


class CitemAgritech extends React.Component {
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
    let image = require('containers/App/maxresdefault.jpg');
    let date = "";
    if(this.props.data){
      title = this.props.data.title;
      if(this.props.data.image!==null){
        let index = this.props.data.image.indexOf("upload/")+7;
        image = this.props.data.image.substring(0,index)+"q_20/"+this.props.data.image.substring(index);
      }
        
      date = this.props.data.timeCreate;
    }
    return (
      <div style={styles.wrapItem}>
        <Row>
          <Col span={6}>
            <img src={image} id="imgstore" width='85px' height='60px' />
          </Col>
          <Col span={18}>
            <div onClick={()=>this.viewDetailNews()} style={styles.showTitle}>{title}</div>
            <div style={styles.showDate}>{`Ngày cập nhật: ${this.convertTime(date)}`}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

CitemAgritech.propTypes = {

};

export default CitemAgritech;
