/**
*
* ModalAddExpert
*
*/

import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button, Icon,Pagination ,Modal} from 'antd';
import styles from './styles';
import Tags from 'components/Utils/Tags';
import {message,} from 'antd';
const _Select = styled.select`
  background-image: linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf);
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
  float: none;
  background-color: transparent;
  background-position: center bottom, center calc(100% - 1px);
  background-repeat: no-repeat;
  background-size: 0 2px, 100% 1px;
  padding: 0;
  transition: background 0s ease-out 0s;
  color: #525252;
  min-height: 35px;
  display: initial;
  width: 100%;
  outline: none;
  font-size: 15px;
  &:focus {
      background-size: 100% 2px, 100% 1px;
      outline: 0 none;
      transition-duration: 0.3s;
      color: #525252;
    }
`;

const _Input = styled.input`
  background-image: linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf);
  border: 0 none;
  border-radius: 0;
  box-shadow: none;
  float: none;
  background-color: transparent;
  background-position: center bottom, center calc(100% - 1px);
  background-repeat: no-repeat;
  background-size: 0 2px, 100% 1px;
  padding: 0;
  transition: background 0s ease-out 0s;
  color: #525252;
  min-height: 35px;
  display: initial;
  width: 100%;
  outline: none;
  font-size: 15px;
  &:focus {
      background-size: 100% 2px, 100% 1px;
      outline: 0 none;
      transition-duration: 0.3s;
      color: #525252;
    }
`;
class ModalAddExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTags: [],
      listDegree: [],
    }
  } 
  componentDidUpdate() {
    // console.log("abc")
    // console.log(this.input)
    // if(this.input!==undefined)
    //   this.input.focus()
  }
  addDegree=()=>{
    console.log("abc")
    if(this.degreeExpert.value && this.degreeExpert.value.trim()!==""){
      var temp = this.state.listDegree;
      temp.push(this.degreeExpert.value.trim())
      this.setState({listDegree: temp})
      this.degreeExpert.value="";
    }
  }
  removeDegree=(idx)=>{
    this.setState({
      listDegree: this.state.listDegree.filter((item,index)=>{
        if(index!==idx) return item;
      })
    })
  }
  addTags=()=>{
    if(this.tagsExpert.value && this.tagsExpert.value.trim()!==""){
      var temp = this.state.listTags;
      temp.push(this.tagsExpert.value.trim())
      this.setState({listTags: temp})
      this.tagsExpert.value="";
    }
  }
  removeTags=(idx)=>{
    this.setState({
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx) return item;
      })
    })
  }
  addExpert=()=>{
    // console.log("abc")
    // console.log(this.nameExpert.value)
    // console.log(this.phoneExpert.value)
    // console.log(this.emailExpert.value)
    // console.log(this.addressExpert.value)
    // console.log("desc: "+this.refs.shortDescExpert.value)

    if(this.nameExpert.value===null || this.nameExpert.value.trim()===""){
      message.error(" Không được bỏ trống họ tên.");
    }else if(this.phoneExpert.value===null || this.phoneExpert.value.trim()===""){
      message.error(" Không được bỏ trống số điện thoại.");
    }else if(this.emailExpert.value===null || this.emailExpert.value.trim()===""){
      message.error(" Không được bỏ trống email.");
    }else if(this.addressExpert.value===null || this.addressExpert.value.trim()===""){
      message.error(" Không được bỏ trống địa chỉ.");
    }else if(this.workExpert.value===null || this.workExpert.value.trim()===""){
      message.error(" Không được bỏ trống nơi làm việc.");
    }else{
      let name  = this.nameExpert.value.trim();
      let phone  = this.phoneExpert.value.trim();
      let email  = this.emailExpert.value.trim();
      let address  = this.addressExpert.value.trim();
      let workplace  = this.workExpert.value.trim();
      let idField = this.select.value;
      this.props.addExpert(this.props.idFieldCurrent,
        name,
        phone,
        this.refs.shortDescExpert.value,
        email,
        address,
        workplace,
        idField,
        this.state.listTags,
        this.state.listDegree)      
    }
    this.props.handleCloseModalAdd();
  }
  resetNews=()=>{
    this.nameExpert.value = "";
    this.phoneExpert.value = "";
    this.emailExpert.value = "";
    this.addressExpert.value = "";
    this.workExpert.value = "";
    this.setState({
      listTags: [],
    });
    this.setState({
      listDegree: [],
    });
    this.refs.shortDescExpert.value = "";
    
  }
  componentWillReceiveProps(nextProps){
    if(this.props.errorCode!==nextProps.errorCode && !this.props.errorCode && nextProps.errorCode===0){
      console.log("error: "+nextProps.errorCode)
      this.resetNews();
      
    }
  }
  render() {
    let dropField = null;
    let tagsShow = null;
    let degreeShow = null;
    if(this.state.listTags && (this.state.listTags.size>0 || this.state.listTags.length>0)){
      tagsShow = this.state.listTags.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeTags}/>
      });
    }
    if(this.state.listDegree && (this.state.listDegree.size>0 || this.state.listDegree.length>0)){
      degreeShow = this.state.listDegree.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeDegree}/>
      });
    }
    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      dropField = this.props.listField.map((item, index) => {
        return (<option value={item.id}  key={index}>{item.name}</option>)    
      })
    }

    let content = (
      <div>
        <Row style={styles.row}>
          <Col span={11}>
            <div style={styles.label}>Họ tên (*)</div>
            <_Input type='text' id="abc" innerRef={(comp) => { this.nameExpert = comp;}} placeholder="Nhập họ tên"/>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <div style={styles.label}>Số điện thoại (*)</div>
            <_Input type='text' innerRef={(comp) => { this.phoneExpert = comp;}} placeholder="Nhập số điện thoại"/>
          </Col>
        </Row>
         <Row style={styles.row}>
          <Col span={24}>
            <div style={styles.label}>Email (*)</div>
            <_Input type='text' innerRef={(comp) => { this.emailExpert = comp;}} placeholder="Nhập email"/>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <div style={styles.label}>Địa chỉ (*)</div>
            <_Input type='text' innerRef={(comp) => { this.addressExpert = comp;}} placeholder="Nhập địa chỉ"/>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <div style={styles.label}>Nơi làm việc (*)</div>
            <_Input type='text' innerRef={(comp) => { this.workExpert = comp;}} placeholder="Nhập nơi làm việc"/>
          </Col>
        </Row>
        
        <Row style={styles.row}>
          <Col span={24}>
            <div style={styles.label}>Lĩnh vực (*)</div>
            <_Select type='text' innerRef={(comp) => { this.select = comp;}} ref="selectFieldExpert">
              {dropField}
            </_Select>
          </Col>
        </Row>
        <Row style={styles.row}>
          <div style={styles.label}>Từ khóa</div>
          <Col span={21}>
            <_Input type='text' innerRef={(comp) => { this.tagsExpert = comp;}} placeholder="Nhập từ khóa"/>
          </Col>
          <Col span={1}>
          </Col>
          <Col span={2} style={{marginTop: 5}}>
            <Button onClick={this.addTags}>Thêm</Button>
          </Col>
          
        </Row>
        <Row>
          <div>{tagsShow}</div>
        </Row>
        <Row style={styles.row}>
          <div style={styles.label}>Bằng cấp</div>
          <Col span={21}>
            <_Input type='text' innerRef={(comp) => { this.degreeExpert = comp;}}  placeholder="Nhập bằng cấp"/>
          </Col>
          <Col span={1}>
          </Col>
          <Col span={2} style={{marginTop: 5}}>
            <Button onClick={this.addDegree}>Thêm</Button>
          </Col>
        </Row>
        <Row>
          <div>{degreeShow}</div>
        </Row>
        <Row style={styles.row}>
          <textarea ref='shortDescExpert' rows="4" placeholder="Nhập mô tả" style={styles.inputStyle}/>
        </Row>
        <Row style={styles.row}>
          <div style={{textAlign: 'end'}}>
            <Button onClick={this.addExpert} type="primary" icon="plus" size='large'>Thêm</Button>
          </div>
        </Row>
      </div>
    )
    
    let modal = (
      <Modal
          title="Thêm chuyên gia"
          visible={this.props.modalAddExpert}
          onCancel={this.props.handleCloseModalAdd}
          footer={null}
          width='55%'
          zIndex = '100'
        >
          {content}
          {/* {loading} */}
        </Modal>
    )
    
    return (
      <div>
        {modal}
        
      </div>
    );
  }
}

ModalAddExpert.propTypes = {

};



export default ModalAddExpert;
