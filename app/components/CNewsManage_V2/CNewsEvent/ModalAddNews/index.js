/**
*
* ModalAddNews
*
*/

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import styles from './styles';
import {Button,Modal,message} from 'antd'
import CKEditor from "react-ckeditor-component";
import Rackeditor from 'components/Utils/Rackeditor';
import Tags from 'components/Utils/Tags';
import CusInput from 'components/Utils/CusInput';
import CusSelect from 'components/Utils/CusSelect';
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

class ModalAddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTags: [],
      stateContent: "",
      content: "",
      initValue: "",
    }
  } 
  handleChangeContent=(content)=>{
  	this.setState({
      content: content,
    })
  }
 
  addTags=()=>{
    if(this.refs.tagsAdd.value && this.refs.tagsAdd.value.trim()!==""){
      var temp = this.state.listTags;
      temp.push(this.refs.tagsAdd.value.trim())
      this.setState({
        listTags: temp
      })
      this.refs.tagsAdd.value="";
    }
  }
  removeTags=(idx)=>{
    this.setState({
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx){
          return item;
        }
      })
    })
  }
  imageHandler=(e2)=>{
    var store = document.getElementById('imgAddNews');
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
    if(this.titleNews.value===null || this.titleNews.value.trim()===""){
      message.error(" Không được bỏ trống tiêu đề.");
    }else if(this.refs.shortDescAdd.value===null || this.refs.shortDescAdd.value.trim()===""){
      message.error(" Thêm mô tả cho tin tức.");
    }else if(this.state.content===null || this.state.content===""){
      message.error(" Nội dung tin tức không được để trống.");
    }else{
      let author = null;
      let source = null;
      if(this.authorNews.value!==null && this.authorNews.value.trim()!==""){
        author = this.authorNews.value.trim();
      }
      if(this.sourceNews.value!=null && this.sourceNews.value.trim()!==""){
        source = this.sourceNews.value.trim();
      }
      if(this.refs.imageForNews.src && this.refs.imageForNews.src.toString().indexOf("data\:image")>-1 && this.refs.imageForNews.src.toString().indexOf(";base64")>-1){
        this.props.addNews(this.props.idcate,this.titleNews.value.trim(),
          this.refs.shortDescAdd.value.trim(),author,this.refs.imageForNews.src.toString(),source,
          this.state.listTags,this.selectCate.value,this.state.content)
          this.props.handleCloseModalAdd();
      }else{
        message.error("Chưa chọn ảnh.");
      }
      
    }
  }
  resetNews=()=>{
    // this.refs.titleAdd.value = "";
    this.refs.shortDescAdd.value = "";
    // this.refs.authorAdd.value = "";
    // this.refs.sourceAdd.value = "";
    this.titleNews.value = "";
    this.authorNews.value = "";
    this.sourceNews.value = "";
    this.setState({
      listTags: [],
    });
    this.refs.imageNewsAdd.value="";
    var store = document.getElementById('imgAddNews');
    store.src = require('containers/App/maxresdefault.jpg');
    this.setState({
      stateContent: "",
      content: "",
      initValue: "",
    });
  }
  componentWillReceiveProps(nextProps){
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode){
      this.resetNews();
      // this.props.handleCloseModalAdd();
    }
  }
  render() {
    let dropDownCate = null;
    let content = null;
    let tagsShow = null;
    if(this.props.listCate && (this.props.listCate.size>0 || this.props.listCate.length>0)){
      dropDownCate = this.props.listCate.map((item, index) => {
        return (<option value={item.id}  key={index}>{item.name}</option>)    
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
          <CusInput type='text' innerRef={(comp) => { this.titleNews = comp;}}  placeholder="Nhập tiêu đề"/>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Mô tả ngắn: </div>
          <div><textarea ref='shortDescAdd' rows="4" placeholder="Nhập mô tả ngắn" style={styles.inputStyle}/></div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Tác giả: </div>
          {/* <div><input ref="authorAdd" type="text"placeholder="Nhập tác giả" style={styles.inputStyle}/></div> */}
          <CusInput type='text' innerRef={(comp) => { this.authorNews = comp;}}  placeholder="Nhập tác giả"/>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Nguồn tham khảo: </div>
          {/* <div><input ref="sourceAdd" type="text" placeholder="Nhập nguồn tham khảo" style={styles.inputStyle}/></div> */}
          <CusInput type='text' innerRef={(comp) => { this.sourceNews = comp;}}  placeholder="Nhập nguồn tham khảo"/>
        </div>
        <div style={{marginBottom:10}}>
          <div style={styles.label}>Danh mục tin tức: </div>
          <div>
            {/* <select ref="selectCateIdAdd" style={styles.inputStyle}> */}
            <CusSelect type='text' innerRef={(comp) => { this.selectCate = comp;}} >
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
              <img src={require('containers/App/maxresdefault.jpg')} id="imgAddNews" ref="imageForNews" width='100%' height='100%' style={{border: "1px solid #1A237E"}}/>
              <input type="file" ref="imageNewsAdd" onChange={(e)=>this.loadImage(e)} style={styles.changeImage} accept="image/*"/>
            </div>
            {/* <div style={{height: 35,width: 240,margin:"auto"}}>
              <Button_ onClick={()=>this.changeImageHandle()}>Đổi ảnh</Button_>
            </div> */}
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
          width='55%'
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

ModalAddNews.propTypes = {

};

export default ModalAddNews;
