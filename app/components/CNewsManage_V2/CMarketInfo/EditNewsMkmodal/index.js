/**
*
* EditNewsMkmodal
*
*/

import React from 'react';
import {Button,Modal,message} from 'antd'
import Tags from 'components/Utils/Tags';
import CusInput from 'components/Utils/CusInput';
import CusSelect from 'components/Utils/CusSelect';
import Rackeditor from 'components/Utils/Rackeditor';
import styles from './styles';

class EditNewsMkmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMK: "",
      initValue: false,
    }
  } 
  handleChangeContent=(content)=>{
  	this.setState({
      contentMK: content,
    })
    if(this.state.initValue){
      this.setState({
        initValue: false,
      })
    }
  }

  componentWillMount(){
    if(this.props.dataNews){
      this.setState({
        contentMK: this.props.dataNews.content,
        initValue: false,
        // title: this.props.dataNews.title,
        // author: this.props.dataNews.author,
        // source: this.props.dataNews.source,
        // shortDesc: this.props.dataNews.shortDescription,
        changed: false,
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.dataNews !== nextProps.dataNews){
      this.resetNews(nextProps.dataNews);
    }
  }
 
  eventUpdateNews=()=>{
    if(this.titleNewsMKEdit.value===null || this.titleNewsMKEdit.value.trim()===""){
      message.error(" Không được bỏ trống tiêu đề.");
    }else if(this.state.content===null || this.state.content===""){
      message.error(" Nội dung tin tức không được để trống.");
    }else{
      let author = "";
      let source = "";
      if(this.authorNewsMKEdit.value!==null && this.authorNewsMKEdit.value.trim()!==""){
        author = this.authorNewsMKEdit.value.trim();
      }
      if(this.sourceNewsMKEdit.value!=null && this.sourceNewsMKEdit.value.trim()!==""){
        source = this.sourceNewsMKEdit.value.trim();
      }
      this.props.updateNewsMK(this.props.dataNews.id,this.titleNewsMKEdit.value.trim(),
          author,source,this.props.dataNews.idCateNews,this.state.contentMK)
          this.props.handleCloseModalEdit();
    }
  }
  resetUpdateNews=()=>{
    if(this.props.dataNews){
      this.resetNews(this.props.dataNews);
    }
  }
  resetNews=(dataNews)=>{
    this.titleNewsMKEdit.value = dataNews.title;
    this.authorNewsMKEdit.value = dataNews.author;
    this.sourceNewsMKEdit.value = dataNews.source;
    this.setState({
      contentMK: dataNews.content,
      initValue: true,
      changed: false,
    });
  }
  titleChange=()=>{
    this.setState({
      changed: true,
    })
  }
  
  authorChange=()=>{
    this.setState({
      changed: true,
    })
  }
  sourceChange=()=>{
    this.setState({
      changed: true,
    })
  }
  render() {
    let content = null;
    if(this.props.dataNews){
      content = (
        <div style={{}}>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Tiêu đề</div>
            <CusInput type='text' defaultValue={this.props.dataNews.title} innerRef={(comp) => { this.titleNewsMKEdit = comp;}}  onChange={this.titleChange}/>
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Tác giả: </div>
            <CusInput type='text' defaultValue={this.props.dataNews.author}  innerRef={(comp) => { this.authorNewsMKEdit = comp;}}  onChange={this.authorChange}/>
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Nguồn tham khảo: </div>
            <CusInput type='text' defaultValue={this.props.dataNews.source} innerRef={(comp) => { this.sourceNewsMKEdit = comp;}}  onChange={this.sourceChange}/>
          </div>
          
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Nội dung: </div>
            <div>
              <Rackeditor id="ckcontentnewsmkedit" initValue={this.state.initValue} value={this.state.contentMK} onChange={this.handleChangeContent}/>
            </div>
          </div>
          <div style={{borderTop: "1px dashed #616161",padding: "5px 0px"}}>
            <Button type="primary" style={{marginRight: 10}} onClick={this.eventUpdateNews}>Submit</Button>
            <Button type="danger" onClick={this.resetUpdateNews}>Reset</Button>
          </div>
        </div>
      )
    }
    let modal = (
      <Modal
          title="Sửa tin tức"
          width='55%'
          visible={this.props.modalEditNews}
          onCancel={this.props.handleCloseModalEdit}
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

EditNewsMkmodal.propTypes = {

};

export default EditNewsMkmodal;
