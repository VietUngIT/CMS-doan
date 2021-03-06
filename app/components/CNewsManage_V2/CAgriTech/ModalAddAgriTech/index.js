import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles';
import {Button,Modal} from 'antd'
import CKEditor from "react-ckeditor-component";
import Rackeditor from 'components/Utils/Rackeditor';
import Tags from 'components/Utils/Tags';
import CusInput from 'components/Utils/CusInput';
import CusSelect from 'components/Utils/CusSelect';
import {message,} from 'antd';
const Button_ = styled.button`
  height: 35px;
  width: 240px;
  font-size: 15px;
  color: #FFFFFF;
  background: #0091ea;
  border : 1px solid #78909c;
  &:focus {
    border : 1px solid #01579b;
    box-shadow: 0 0 0 2px rgba(16, 142, 233, 0.2);
    outline: 0;
  },
`;

class ModalAddAgriTech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTags: [],
      stateContent: "",
      content: "",
      initValue: false,
    }
  } 
  handleChangeContent=(content)=>{
  	this.setState({
      content: content,
    })
    if(this.state.initValue){
      this.setState({
        initValue: false,
      })
    }
  }
  addTags=()=>{
    if(this.refs.tagsAdd.value && this.refs.tagsAdd.value.trim()!==""){
      var temp = this.state.listTags;
      temp.push(this.refs.tagsAdd.value.trim())
      this.setState({listTags: temp})
      this.refs.tagsAdd.value="";
    }
  }
  removeTags=(idx)=>{
    this.setState({
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx){return item;}
      })
    })
  }
  imageHandler=(e2)=>{
    var store = document.getElementById('imgAddNewsAgriTech');
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.toString();
  }
  loadImage(e){
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }
  onChangeContent=(e)=>{
    var content = e.editor.getData();
    this.setState({stateContent: content})
  }

  eventAddNews=()=>{
    if(this.titleAG.value===null || this.titleAG.value.trim()===""){
      message.error(" Không được bỏ trống tiêu đề.");
    }else if(this.state.content===null || this.state.content.trim()===""){
      message.error(" Nội dung tin tức không được để trống.");
    }else{
      let author = null;
      if(this.authorAG.value!=null && this.authorAG.value.trim()!==""){
        author = this.authorAG.value.trim();
      }
      let image = null;
      if(this.refs.imageForNewsAgriTech.src && this.refs.imageForNewsAgriTech.src.toString().indexOf("data\:image")>-1 && this.refs.imageForNewsAgriTech.src.toString().indexOf(";base64")>-1){
        image = this.refs.imageForNewsAgriTech.src.toString();
      }
      this.props.addNewsAgriTech(this.props.idSubcate,this.titleAG.value.trim(),
          author,image,
          this.state.listTags,this.selectCateAG.value,this.state.content)
          this.props.handleCloseModalAdd();
      
      
    }
  }
  resetNews=()=>{
    this.titleAG.value = "";
    this.authorAG.value = "";
    this.setState({listTags: [],});
    this.refs.imageNewsAdd.value="";
    var store = document.getElementById('imgAddNewsAgriTech');
    store.src = require('containers/App/maxresdefault.jpg');
    this.setState({
      stateContent: "",
      content: "",
      initValue: true,
    });
  }
  componentWillReceiveProps(nextProps){
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode){
      this.resetNews();
      
    }
  }
  render() {
    // console.log("this.props.listSubCate: "+this.props.listSubCate)
    let content = null;
    let dropDownCate = null;
    let tagsShow = null;
    if(this.props.listSubCate && (this.props.listSubCate.size>0 || this.props.listSubCate.length>0)){
      dropDownCate = this.props.listSubCate.map((item, index) => {
        return (<option value={item.id}  key={index}>{item.nameSubCate}</option>)    
      })
    }
    if(this.state.listTags && (this.state.listTags.size>0 || this.state.listTags.length>0)){
      tagsShow = this.state.listTags.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeTags}/>
      });
    }
    content = (
      <div style={{}}>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tiêu đề</div>
          {/* <div><input ref="titleAdd" type="text" placeholder="Nhập title" style={styles.inputStyle}/></div> */}
          <CusInput type='text' innerRef={(comp) => { this.titleAG = comp;}}  placeholder="Nhập tiêu đề"/>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tác giả: </div>
          {/* <div><input ref="authorAdd" type="text"placeholder="Nhập tác giả" style={styles.inputStyle}/></div> */}
          <CusInput type='text' innerRef={(comp) => { this.authorAG = comp;}}  placeholder="Nhập tác giả"/>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Danh mục tin tức: </div>
          <div>
            {/* <select ref="selectCateIdAdd" style={styles.inputStyle}> */}
            <CusSelect type='text' innerRef={(comp) => { this.selectCateAG = comp;}} >
              {dropDownCate}
            </CusSelect>
            {/* </select> */}
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tags: </div>
          <div style={{padding :"5px 0px"}}>
            {tagsShow}
            <div style={{}}>
              <input ref="tagsAdd" type="text" placeholder="Nhập tags mới ..." style={styles.inputTagsStyle}/>
              <Button type="primary" onClick={this.addTags} ghost>Thêm</Button>
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Hình ảnh: </div> 
          <div>
            <div style={{width:240,height:200,margin:"auto",marginBottom:20,position: 'relative'}}>
              <img src={require('containers/App/maxresdefault.jpg')} id="imgAddNewsAgriTech" ref="imageForNewsAgriTech" width='100%' height='100%' style={{border: "1px solid #1A237E"}}/>
              <input type="file" ref="imageNewsAdd" onChange={(e)=>this.loadImage(e)} style={styles.changeImage} accept="image/*"/>
            </div>
          </div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Nội dung: </div>
          <div>
            <Rackeditor id="ckcontentnews" initValue={this.state.initValue} value={this.state.content} onChange={this.handleChangeContent}/>
          </div>
        </div>
        <div style={{borderTop: "1px dashed #616161",padding: "5px 0px"}}>
          <Button type="primary" style={{marginRight: 10}} onClick={this.eventAddNews}>Submit</Button>
          <Button type="danger" onClick={this.resetNews}>Reset</Button>
        </div>
      </div>
    )
    let modal = (
      <Modal
          title="Thêm tin tức"
          width="50%"
          visible={this.props.modalAddNews}
          onCancel={this.props.handleCloseModalAdd}
          footer={null}
        >
          {content}
        </Modal>
    )
    return (
      <div>
        {modal}
      </div>
    );
  }
}

ModalAddAgriTech.propTypes = {

};

export default ModalAddAgriTech;
