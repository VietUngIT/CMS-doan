import React from 'react';
import styles from './styles';
import {Button,Modal,message} from 'antd'


class ModalAddCateMp extends React.Component {
  constructor(props) {
    super(props);
  } 
  imageHandler=(e2)=>{
    var store = document.getElementById('imgAddNewsMP');
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.toString();
  }
  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }
  eventAddNews=()=>{
    if(this.refs.nameAdd.value===null || this.refs.nameAdd.value.trim()===""){
      message.error(" Tên không được bỏ trống.");
    }else{
      if(this.refs.imageForNewsMP.src && this.refs.imageForNewsMP.src.toString().indexOf("data\:image")>-1 && this.refs.imageForNewsMP.src.toString().indexOf(";base64")>-1){
        this.props.addCateMP(this.refs.nameAdd.value.trim(),this.refs.imageForNewsMP.src.toString())
        this.props.handleCloseModalAdd();
      }else{
        message.error("Chưa chọn ảnh.");
      }
      
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode && nextProps.errorCode===0){
      this.resetNews();
      
    }
  }
  resetNews=()=>{
    this.refs.nameAdd.value = "";
    this.refs.imageForNewsMP.value="";
    var store = document.getElementById('imgAddNewsMP');
    store.src = require('containers/App/maxresdefault.jpg');
  }
  render() {
    let content = null;
    content = (
      <div>
        <div style={{width:485,height:260,margin:"auto",marginBottom:20,position: 'relative'}}>
          <img src={require('containers/App/maxresdefault.jpg')} id="imgAddNewsMP" ref="imageForNewsMP" width='100%' height='100%' style={{border: "1px solid #1A237E"}}/>
          <input type="file" ref="imageNewsAddMP" onChange={(e)=>this.loadImage(e)} style={styles.changeImage} accept="image/*"/>
        </div>
        <div>
          <input ref="nameAdd" type="text" placeholder="Nhập tên danh mục" style={styles.inputStyle}/>
        </div>
        <div style={{padding: 5,textAlign: 'end'}}>
          <Button type="primary" style={{marginRight: 10}} onClick={this.eventAddNews}>Submit</Button>
        </div>
      </div>
    )
    return (
      <Modal
        title="Thêm danh mục"
        visible={this.props.modalAddNews}
        onCancel={this.props.handleCloseModalAdd}
        footer={null}
      >
        {content}
      </Modal>
    );
  }
}

ModalAddCateMp.propTypes = {

};

export default ModalAddCateMp;
