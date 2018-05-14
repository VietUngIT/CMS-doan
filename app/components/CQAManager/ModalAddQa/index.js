
import React from 'react';
// import styled from 'styled-components';
import { Row, Col, Button, Icon,Pagination ,Modal} from 'antd';
import CusSelect from 'components/Utils/CusSelect';
import CusInput from 'components/Utils/CusInput';
import CusArea from 'components/Utils/CusArea';
import Rackeditor from 'components/Utils/Rackeditor';
import styles from './styles';
import {message,} from 'antd';

var toolbarGroups = [
  { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
  { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
  { name: 'insert', items: ['Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
  '/',
  { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
  { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
  { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
  { name: 'about', items: [ 'About' ] }
];
class ModalAddQa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // contentQuestion: "",
      // initValueQuestion: "",
      contentAnswer: "",
      initValueAnswer: false,
    };
  }
  // handleChangeQuestion=(content)=>{
  // 	this.setState({
  //     contentQuestion: content,
  //   })
  // }
  handleChangeAnswer=(content)=>{
  	this.setState({
      contentAnswer: content,
    })
    if(this.state.initValueAnswer){
      this.setState({
        initValueAnswer: false,
      })
    }
  }

  addQA=()=>{
    if(this.titleQA.value===null || this.titleQA.value===""){
      message.error(" Không được bỏ trống tiêu đề.");
    } else if(this.questionQA.value===null || this.questionQA.value===""){
      message.error(" Không được bỏ trống câu hỏi.");
    } else if(this.state.contentAnswer===null || this.state.contentAnswer===""){
      message.error(" Không được bỏ trống câu trả lời.");
    }else{
      this.props.addQA(this.titleQA.value,this.questionQA.value,this.state.contentAnswer,this.selectField.value);
      this.props.handleCloseModalAdd();
    }
  }
  resetQA=()=>{
    // console.log("resetQA");
    this.titleQA.value = "";
    this.questionQA.value = "";
    this.setState({
      contentAnswer: "",
      initValueAnswer: true,
    });
  
  }
  btnResetQA=()=>{
    this.resetQA();
  }
  componentWillReceiveProps(nextProps){
    // console.log("componentWillReceiveProps");
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode && nextProps.errorCode===0){
      // console.log("componentWillReceiveProps-resetQA");
      this.resetQA();
    }
  }
  render() {
    let content = false;
    let dropField = false;
    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      dropField = this.props.listField.map((item,index)=>{
        if(item!==null){
          return (<option value={item.id}  key={index}>{item.name}</option>)
        }
      });

      content = (
        <div>
          <div style={styles.label}>Chọn lĩnh vực</div>
          <CusSelect type='text' innerRef={(comp) => { this.selectField = comp;}} ref="selectFieldQA">
            {dropField}
          </CusSelect>
          <div style={styles.label}>Tiêu đề (*)</div>
          <CusInput type='text' innerRef={(comp) => { this.titleQA = comp;}}  placeholder="Nhập tiêu đề"/>
          <div style={styles.label}>Câu hỏi (*)</div>
          <div style={{paddingTop: 7}}>
          {/* <Rackeditor id="ckquestionadd" initValue={this.state.initValueQuestion} value={this.state.contentQuestion} onChange={this.handleChangeQuestion}/> */}
          <CusArea type='text' rows='6' innerRef={(comp) => { this.questionQA = comp;}}  placeholder="Nhập nội dung câu hỏi"/>
          </div>
          <div style={styles.label}>Câu trả lời (*)</div>
          <div style={{paddingTop: 7}}>
          <Rackeditor id="ckansweradd" initValue={this.state.initValueAnswer} value={this.state.contentAnswer} onChange={this.handleChangeAnswer}/>
          </div>
          <div style={{textAlign: 'end',paddingTop: 10}}>
            <Button onClick={this.btnResetQA} style={{marginRight:10}} size='large'>Reset</Button>
            <Button onClick={this.addQA} type="primary" icon="plus" size='large'>Thêm</Button>
          </div>
        </div>
      )
    }
    let modal = (
      <Modal
          title="Thêm Q&A"
          visible={this.props.modalAdd}
          onCancel={this.props.handleCloseModalAdd}
          footer={null}
          width='55%'
          zIndex = '100'
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

ModalAddQa.propTypes = {

};

export default ModalAddQa;
