
import React from 'react';
// import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles';
import { browserHistory } from 'react-router';


class CitemExpert extends React.Component { 
  viewDetailExpert=()=>{
    browserHistory.push(`/expert-info/${this.props.data._id}`)
  }
  render() {
    let name = "";
    let avatar = require('containers/App/maxresdefault.jpg');
    let phone = "";
    let address = "";
    if(this.props.data){
      name = this.props.data.name;
      if(this.props.data.avatar!==null){
        let index = this.props.data.avatar.indexOf("upload/")+7;
        avatar = this.props.data.avatar.substring(0,index)+"q_20/"+this.props.data.avatar.substring(index);
      }
      phone = this.props.data.phone;
      address = this.props.data.address;
    }
    return (
      <div style={styles.wrapItem}>
        <Row>
          <Col span={4}>
            <img src={avatar===null?require('containers/App/fuse.svg'):avatar} id="imgstore" style={styles.avatar}/>
          </Col>
          <Col span={14}>
            <div style={styles.showName}>{name}</div>
            <div style={styles.showInfo}>{address}</div>
            <div style={styles.showInfo}>{phone}</div>
          </Col>
          <Col span={6}>
            <div style={styles.viewDetail}>
              <Button type="primary" onClick={this.viewDetailExpert} ghost>Chi tiết</Button>
            </div>
          </Col>
        </Row>
        
      </div>
    );
  }
}

CitemExpert.propTypes = {

};

export default CitemExpert;
