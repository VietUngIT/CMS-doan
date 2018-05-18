
import React from 'react';
// import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import CitemFieldExpert from '../CitemFieldExpert'
import {message,} from 'antd';


class ClistFieldExpert extends React.Component { 
  addField=()=>{
    if(this.refs.nameField.value==null || this.refs.nameField.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addField(this.refs.nameField.value)
      this.refs.nameField.value="";
    }
  }
  render() {
    let listField = null;
    if(this.props.listField && (this.props.listField.size>0|| this.props.listField.length>0)){
      listField = this.props.listField.map((item,index) => {
        return (<CitemFieldExpert key={index} index={index} data={item} delField={this.props.delField}/>);
      });
    }
    return (
      <div>
        <Row style={styles.row}>
          <Col span={3} style={{fontWeight: 600}}>STT</Col>
          <Col span={12} style={{fontWeight: 600}}>Tên</Col>
          <Col span={5} style={{fontWeight: 600}}></Col>
          <Col span={4} style={{fontWeight: 600}}></Col>
        </Row>
        <Row style={{borderBottom: '1px solid #ffbf00',display: 'flex'}}>
          <div style={{flex: 1}}>
            <input type='text' ref="nameField" placeholder="Nhập tên danh mục..."  style={styles.input}/>
          </div>
          <div style={{flexBasis: 105}}>
            <div onClick={this.addField} style={styles.buttonAdd}>Thêm</div>
          </div>
        </Row>
        {listField}
      </div>
    );
  }
}

ClistFieldExpert.propTypes = {

};

export default ClistFieldExpert;
