/**
*
* EditNewsEventModal
*
*/

import React from 'react';
import styles from './styles';
import {Button,Modal,message} from 'antd'
import Rackeditor from 'components/Utils/Rackeditor';
import Tags from 'components/Utils/Tags';
import CusInput from 'components/Utils/CusInput';
import CusSelect from 'components/Utils/CusSelect';
import { EditorFormatListBulleted } from 'material-ui';


class EditNewsEventModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      initValue: false,
      title: false,
      author: false,
      source: false,
      shortDesc: false,
      changed: false,
      reset: false,
    }
  } 
  handleChangeContent=(content)=>{
  	this.setState({
      content: content,
      changed: true,
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
        content: this.props.dataNews.content,
        initValue: false,
        title: this.props.dataNews.title,
        author: this.props.dataNews.author,
        source: this.props.dataNews.source,
        shortDesc: this.props.dataNews.shortDescription,
        changed: false,
      });
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps")
    if(this.props.dataNews !== nextProps.dataNews){
      this.resetNews(nextProps.dataNews);
    }
  }
 
  eventUpdateNews=()=>{
    if(this.titleNewsEdit.value===null || this.titleNewsEdit.value.trim()===""){
      message.error(" Không được bỏ trống tiêu đề.");
    }else if(this.refs.shortDescAdd.value===null || this.refs.shortDescAdd.value.trim()===""){
      message.error(" Thêm mô tả cho tin tức.");
    }else if(this.state.content===null || this.state.content===""){
      message.error(" Nội dung tin tức không được để trống.");
    }else{
      let author = null;
      let source = null;
      if(this.authorNewsEdit.value!==null && this.authorNewsEdit.value.trim()!==""){
        author = this.authorNewsEdit.value.trim();
      }
      if(this.sourceNewsEdit.value!=null && this.sourceNewsEdit.value.trim()!==""){
        source = this.sourceNewsEdit.value.trim();
      }
      this.props.updateNewsEvent(this.props.dataNews.id,this.titleNewsEdit.value.trim(),
          this.refs.shortDescAdd.value.trim(),author,source,
          this.props.dataNews.idCateNews,this.state.content)
          this.props.handleCloseModalEdit();
    }
  }
  resetUpdateNews=()=>{
    if(this.props.dataNews){
      this.resetNews(this.props.dataNews);
    }
  }
  resetNews=(dataNews)=>{
    this.titleNewsEdit.value = dataNews.title;
    this.authorNewsEdit.value = dataNews.author;
    this.sourceNewsEdit.value = dataNews.source;
    this.refs.shortDescAdd.value = dataNews.shortDescription;
    this.setState({
      content: dataNews.content,
      initValue: true,
      changed: false,
    });
  }
  titleChange=()=>{
    this.setState({
      changed: true,
    })
  }
  descChange=()=>{
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
            <CusInput type='text' defaultValue={this.props.dataNews.title} innerRef={(comp) => { this.titleNewsEdit = comp;}} onChange={this.titleChange} />
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Mô tả ngắn: </div>
            <div><textarea ref='shortDescAdd' defaultValue={this.props.dataNews.shortDescription} rows="4" style={styles.inputStyle} onChange={this.descChange}/></div>
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Tác giả: </div>
            <CusInput type='text' defaultValue={this.props.dataNews.author} innerRef={(comp) => { this.authorNewsEdit = comp;}} onChange={this.authorChange}/>
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Nguồn tham khảo: </div>
            <CusInput type='text' defaultValue={this.props.dataNews.source} innerRef={(comp) => { this.sourceNewsEdit = comp;}} onChange={this.sourceChange}/>
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Nội dung: </div>
            <div>
              <Rackeditor id="ckcontentnewsedit" initValue={this.state.initValue} value={this.state.content} onChange={this.handleChangeContent}/>
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
          title="Thêm tin tức"
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

EditNewsEventModal.propTypes = {

};

export default EditNewsEventModal;
