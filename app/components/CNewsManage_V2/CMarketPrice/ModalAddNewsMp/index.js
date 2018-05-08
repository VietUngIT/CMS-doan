/**
*
* ModalAddNewsMp
*
*/

import React from 'react';
import styles from './styles';
import {Button,Modal,message} from 'antd'


class ModalAddNewsMp extends React.Component {
  eventAddNews=()=>{
    if(this.refs.nameAddNews.value===null || this.refs.nameAddNews.value.trim()===""){
      message.error(" Tên không được bỏ trống.");
    }else if(this.refs.priceAddNews.value===null || this.refs.priceAddNews.value.trim()===""){
      message.error(" Giá không được bỏ trống.");
    }else if(this.refs.unitAddNews.value===null || this.refs.unitAddNews.value.trim()===""){
      message.error(" Đơn vị tính không được bỏ trống.");
    }else if(this.refs.placeAddNews.value===null || this.refs.placeAddNews.value.trim()===""){
      message.error(" Địa điểm không được bỏ trống.");
    }else{
      let name = this.refs.nameAddNews.value;
      let price = this.refs.priceAddNews.value;
      let unit = this.refs.unitAddNews.value;
      let place = this.refs.placeAddNews.value;
      let note = null;
      if(this.refs.noteAddNews.value===null || this.refs.noteAddNews.value.trim()===""){
        note = "";
      }else{
        note = this.refs.noteAddNews.value;
      }
      this.props.addNewsMP(this.props.idCate,name,price,unit,place,note)
      this.props.setLoading(true);
      this.props.handleCloseModalAdd();
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode && nextProps.errorCode===0){
      this.resetNews();
      
    }
  }
  resetNews=()=>{
    this.refs.nameAddNews.value = "";
    this.refs.priceAddNews.value = "0";
    this.refs.unitAddNews.value = "";
    this.refs.placeAddNews.value = "";
    this.refs.noteAddNews.value = "";
  }
  render() {
    let content = null;
    content = (
      <div>
        <div>
          <div>Tên nông sản</div>
          <input ref="nameAddNews" type="text" placeholder="Nhập tên nông sản" style={styles.inputStyle}/>
        </div>
        <div>
          <div>Giá nông sản</div>
          <input ref="priceAddNews" type="number" type="number" min="0" placeholder="Nhập giá nông sản" style={styles.inputStyle}/>
        </div>
        <div>
          <div>Đơn vị tính</div>
          <input ref="unitAddNews" type="text" placeholder="Nhập đơn vị tính" style={styles.inputStyle}/>
        </div>
        <div>
          <div>Địa điểm</div>
          <input ref="placeAddNews" type="text" placeholder="Nhập địa điểm niêm yết giá" style={styles.inputStyle}/>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Ghi chú: </div>
          <div><textarea ref='noteAddNews' rows="4" placeholder="Nhập ghi chú" style={styles.inputStyle}/></div>
        </div>
        <div style={{padding: 5,textAlign: 'end'}}>
          <Button type="primary" style={{marginRight: 10}} onClick={this.eventAddNews}>Submit</Button>
        </div>
      </div>
    )
    return (
      <Modal
        title="Thêm tin tức"
        visible={this.props.modalAddNews}
        onCancel={this.props.handleCloseModalAdd}
        footer={null}
      >
        {content}
      </Modal>
    );
  }
}

ModalAddNewsMp.propTypes = {

};

export default ModalAddNewsMp;
