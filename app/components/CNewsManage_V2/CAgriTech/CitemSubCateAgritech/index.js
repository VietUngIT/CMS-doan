
import React from 'react';
import styles from './styles'
import { Link, } from 'react-router';
import { Row, Col, Button, Icon, Popconfirm } from 'antd';

class CitemSubCateAgritech extends React.Component {
  onClickDelete=()=>{
    if(this.props.data){
      this.props.delSubCate(this.props.data.id)
      this.props.setLoading(true)
    }
  }
  render() {
    return (
      <Row style={styles.row}>
        <Col span={3}>{this.props.index+1}</Col>
        <Col span={12}>{this.props.data.nameSubCate}</Col>
        <Col span={4}>
          <Popconfirm title="Bạn chắc chắn muốn xóa tin tức này?" onConfirm={this.onClickDelete} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
            <div style={styles.actionDel} >Xóa</div>
          </Popconfirm>
        </Col>
        <Col span={5}>
          <Link style={{textDecoration: "underline"}} to={`/agritech/${this.props.idCate}/${this.props.data.id}`}>
            Xem danh sách tin tức
          </Link>
        </Col>
      </Row>
    );
  }
}

CitemSubCateAgritech.propTypes = {

};

export default CitemSubCateAgritech;
