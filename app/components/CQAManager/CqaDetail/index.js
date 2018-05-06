/**
*
* CqaDetail
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Row, Col, Button, Icon,Pagination ,Modal,Popconfirm} from 'antd';
import styles from './styles';
import CusInput from 'components/Utils/CusInput';
import Rackeditor from 'components/Utils/Rackeditor';
import {message,} from 'antd';

var questionDiv = false;
var answerDiv = false;
class CqaDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      contentQuestion: "",
      initValueQuestion: "",
      contentAnswer: "",
      initValueAnswer: "",
    };
  }
  componentDidMount(){
    if(this.props.qaDetail){
      questionDiv = document.getElementById('question');
      questionDiv.innerHTML = this.props.qaDetail.content;
      answerDiv = document.getElementById('answer');
      answerDiv.innerHTML = this.props.qaDetail.answer;
    }

  }
  handleChangeQuestion=(content)=>{
  	this.setState({
      contentQuestion: content,
    })
  }
  handleChangeAnswer=(content)=>{
  	this.setState({
      contentAnswer: content,
    })
  }
  componentWillReceiveProps(nextProps){
    if(this.props.qaDetail!==nextProps.qaDetail){
      this.setState({
        isEdit: false,
      })
    }
    if(this.props.errorCodeEdit!==nextProps.errorCodeEdit && nextProps.errorCodeEdit===0){
      this.setState({
        isEdit: false,
      })
    }
  }
  componentDidUpdate(){
    if(this.props.qaDetail){
      questionDiv = document.getElementById('question');
      questionDiv.innerHTML = this.props.qaDetail.content;
      answerDiv = document.getElementById('answer');
      answerDiv.innerHTML = this.props.qaDetail.answer;
    }
  }
  editQA=()=>{
    this.setState({
      isEdit: true,
    });
    if(this.props.qaDetail){
      this.titleQA.value = this.props.qaDetail.title;
      this.setState({
        initValueQuestion: this.props.qaDetail.content,
        initValueAnswer: this.props.qaDetail.answer,
      });
    }
  }
  cancelEdit=()=>{
    this.setState({
      isEdit: false,
    })
  }
  confirm=(e)=> {
    if(this.props.qaDetail){
      this.props.delQA(this.props.qaDetail.id);
    }
  }
  cancel(e) {
    console.log('Click on No');
  }
  updateInfo=()=>{
    if(this.titleQA.value===null || this.titleQA.value===""){
      message.error(" Không được bỏ trống tiêu đề.");
    } else if(this.state.contentQuestion===null || this.state.contentQuestion===""){
      message.error(" Không được bỏ trống câu hỏi.");
    } else if(this.state.contentAnswer===null || this.state.contentAnswer===""){
      message.error(" Không được bỏ trống câu trả lời.");
    }else{
      if(this.props.qaDetail){
        this.props.editQA(this.titleQA.value,this.state.contentQuestion,this.state.contentAnswer,this.props.qaDetail.id);
      }
    }
  }
  render() {
    let title = false;
    if(this.props.qaDetail){
      title = this.props.qaDetail.title;
    }
    return (
      <div>
        <div>
        <div style={styles.wrapActionTop}>
            <Popconfirm title="Bạn chắc chắn muốn xóa tin tức này?" onConfirm={this.confirm} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
              <Button style={{marginRight:10}} icon="delete" type="danger" size='large'>Xóa</Button>
            </Popconfirm>
            <Button onClick={this.editQA} type="primary" icon="edit" size='large'>Sửa</Button>
          </div>
        </div>
        <div style={styles.wrapContent}>
          <div style={styles.title}>
            <div style={{display: !this.state.isEdit?'none':"", marginBottom: 15}}>
              <div style={{fontStyle: 'italic'}}>Tiêu đề:</div>
              <CusInput type='text' innerRef={(comp) => { this.titleQA = comp;}}  placeholder="Nhập tiêu đề"/>
            </div>
            <div style={{display: this.state.isEdit?'none':""}}>
              {title}
            </div>
          </div>
          <div style={{marginBottom: 15}}>
            <div>
              <div style={{fontStyle: 'italic'}}>Câu hỏi:</div>
            </div>
            <div style={{display: !this.state.isEdit?'none':""}}>
              <Rackeditor id="ckquestion" initValue={this.state.initValueQuestion} value={this.state.contentQuestion} onChange={this.handleChangeQuestion}/>
            </div>
            <div id="question" style={{padding: 7,display: this.state.isEdit?'none':""}}></div>
          </div>
          <div style={{marginBottom: 15}}>
            <div>
              <div style={{fontStyle: 'italic'}}>Câu trả lời</div>
            </div>
            <div style={{display: !this.state.isEdit?'none':""}}>
              <Rackeditor id="ckanswer" initValue={this.state.initValueAnswer} value={this.state.contentAnswer} onChange={this.handleChangeAnswer}/>
            </div>
            <div id="answer" style={{padding: 7,display: this.state.isEdit?'none':""}}></div>
          </div>
          
        </div>
        <div style={{display: this.state.isEdit?"":"none"}}>
          <div style={styles.wrapActionBottom}>
            <Button onClick={this.cancelEdit} style={{marginRight:10}} icon="close" size='large'>Hủy</Button>
            <Button onClick={this.updateInfo}type="primary" icon="sync" size='large'>Cập nhật</Button>
          </div>
        </div>
      </div>
    );
  }
}

CqaDetail.propTypes = {

};

export default CqaDetail;
