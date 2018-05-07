

import React from 'react';
import { Row, Col, Button, Icon,Popconfirm } from 'antd';
import styles from './styles'
import { Link, } from 'react-router';


class ItemCateNewsEvent extends React.Component {
  onClickDelete=()=>{
    if(this.props.data){
      this.props.delCateNews(this.props.data.id)
    }
  }
  cancel=()=>{
    
  }
  render() {
    return (
      <Row style={styles.row}>
        <Col span={3}>{this.props.index+1}</Col>
        <Col span={12}>{this.props.data.name}</Col>
        <Col span={4}>
          <Popconfirm title="Bạn chắc chắn muốn xóa tin tức này?" onConfirm={this.onClickDelete} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
            <div style={styles.actionDel} >Xóa</div>
          </Popconfirm>
        </Col>
        <Col span={5}>
          <Link style={{textDecoration: "underline"}} to={`/news/${this.props.data.id}`}>
            Xem danh sách tin tức
          </Link>
        </Col>
      </Row>
    );
  }
}

ItemCateNewsEvent.propTypes = {

};

export default ItemCateNewsEvent;
