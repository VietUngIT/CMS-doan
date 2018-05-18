import React from 'react';
// import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';
import styles from './styles'
import ItemCateMarketInfo from '../ItemCateMarketInfo'
import {message,} from 'antd';


class CcateMarketInfo extends React.Component { 
  addCategory=()=>{
    if(this.refs.categoryMK.value==null || this.refs.categoryMK.value.trim()===""){
      message.error("Nhập đầy đủ thông tin.")
    }else{
      this.props.addCateNewsMK(this.refs.categoryMK.value)
      this.refs.categoryMK.value="";
    }
  }
  render() {
    let listcat = null;
    if(this.props.listCate && (this.props.listCate.size>0|| this.props.listCate.length>0)){
      listcat = this.props.listCate.map((item,index) => {
        return (<ItemCateMarketInfo key={index} index={index} data={item} delCateNewsMK={this.props.delCateNewsMK}/>);
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
        <Row style={{borderBottom: '1px solid #ffbf00', display: 'flex'}}>
          <div style={{flex: 1}}>
            <input type='text' ref="categoryMK" placeholder="Nhập tên danh mục..."  style={styles.input}/>
          </div>
          <div style={{flexBasis: 105}}>
            <div onClick={this.addCategory} style={styles.buttonAdd}>Thêm</div>
          </div>
        </Row>
        {listcat}
      </div>
    );
  }
}

CcateMarketInfo.propTypes = {

};

export default CcateMarketInfo;
