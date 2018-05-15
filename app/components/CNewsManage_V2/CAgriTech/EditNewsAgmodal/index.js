/**
*
* EditNewsAgmodal
*
*/

import React from 'react';
import {Button,Modal,message} from 'antd'
import Tags from 'components/Utils/Tags';
import CusInput from 'components/Utils/CusInput';
import CusSelect from 'components/Utils/CusSelect';
import Rackeditor from 'components/Utils/Rackeditor';
import styles from './styles';


class EditNewsAgmodal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      contentAG: "",
      initValue: false,
    }
  }
  handleChangeContent=(content)=>{
  	this.setState({
      contentAG: content,
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
        contentAG: this.props.dataNews.content,
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
    if(this.titleNewsAGEdit.value===null || this.titleNewsAGEdit.value.trim()===""){
      message.error(" Không được bỏ trống tiêu đề.");
    }else if(this.state.content===null || this.state.content===""){
      message.error(" Nội dung tin tức không được để trống.");
    }else{
      let author = "";
      if(this.authorNewsAGEdit.value!==null && this.authorNewsAGEdit.value.trim()!==""){
        author = this.authorNewsAGEdit.value.trim();
      }
      
      this.props.updateNewsAG(this.props.dataNews.id,this.titleNewsAGEdit.value.trim(),
          author,this.props.dataNews.idSubCate,this.state.contentAG)
          this.props.handleCloseModalEdit();
    }
  }
  resetUpdateNews=()=>{
    if(this.props.dataNews){
      this.resetNews(this.props.dataNews);
    }
  }
  resetNews=(dataNews)=>{
    this.titleNewsAGEdit.value = dataNews.title;
    this.authorNewsAGEdit.value = dataNews.author;
    this.setState({
      contentAG: dataNews.content,
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
  
  render() {
    let content = null;
    if(this.props.dataNews){
      content = (
        <div style={{}}>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Tiêu đề</div>
            <CusInput type='text' defaultValue={this.props.dataNews.title} innerRef={(comp) => { this.titleNewsAGEdit = comp;}}  onChange={this.titleChange}/>
          </div>
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Tác giả: </div>
            <CusInput type='text' defaultValue={this.props.dataNews.author}  innerRef={(comp) => { this.authorNewsAGEdit = comp;}}  onChange={this.authorChange}/>
          </div>
          
          <div style={{marginBottom:10}}>
            <div style={styles.label}>Nội dung: </div>
            <div>
              <Rackeditor id="ckcontentnewsagedit" initValue={this.state.initValue} value={this.state.contentAG} onChange={this.handleChangeContent}/>
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

EditNewsAgmodal.propTypes = {

};

export default EditNewsAgmodal;
