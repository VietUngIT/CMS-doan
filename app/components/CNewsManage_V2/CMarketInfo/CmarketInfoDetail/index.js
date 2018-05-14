/**
*
* CmarketInfoDetail
*
*/

import React from 'react';
import styles from './styles';
import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';
import Tags from 'components/Utils/Tags';
import CusInput from 'components/Utils/CusInput';



var contentMKDiv = null;
class CmarketInfoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTags: [],
      image: false,
      changedImage: false,
      changedtags: false,
      
    }
  } 
  updateImage=()=>{
    if(this.props.newsMKInfo && this.state.changedImage){
      this.props.updateImage(this.state.image,this.props.newsMKInfo.id);
      this.setState({
        changedImage: false,
      });
    }
  }
  imageHandler=(e2)=>{
    var store = document.getElementById('imgstore');
    this.setState({
      image: e2.target.result,
      changedImage: true,
    });
    store.src = e2.target.result;
    var dataInBase64 = e2.target.result.toString();
  }
  loadImage=(e)=>{
    var filename = e.target.files[0];
    var fr = new FileReader();
    fr.onload = this.imageHandler;
    fr.readAsDataURL(filename);
  }
  addTags(){
    if(this.tagsAdd.value && this.tagsAdd.value.trim()!==""){
      var temp = this.state.listTags;
      temp.push(this.tagsAdd.value.trim())
      this.setState({
        listTags: temp,
        changedtags: true,
      })
      this.tagsAdd.value="";
    }
  }
  removeTags=(idx)=>{
    this.setState({
      changedtags: true,
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx){
          return item;
        }
      })
    })
  }
  onkeyPress=(eventKey)=>{
    if(eventKey.key == 'Enter'){
      this.addTags();
    }
    
  }
  updateTags=()=>{
    if(this.props.newsMKInfo && this.state.changedtags){
      this.props.updateTags(this.state.listTags,this.props.newsMKInfo.id);
      this.setState({
        changedtags: false,
      });
    }
    
  }
  componentWillReceiveProps(nextProps){
    if(this.props.newsMKInfo !== nextProps.newsMKInfo){
      let temp = JSON.parse(nextProps.newsMKInfo.tags);
      let tagsTemp = [];
      temp.map((item,index)=>{
        tagsTemp.push(item);
      });
      this.setState({
        listTags: tagsTemp,
        image: nextProps.newsMKInfo.image,
        changedImage: false,
        changedtags: false,
      });
    }
  }
  componentDidMount(){
    if(this.props.newsMKInfo){
      contentMKDiv = document.getElementById('contentNewsMK');
      contentMKDiv.innerHTML = this.props.newsMKInfo.content;
      let temp = JSON.parse(this.props.newsMKInfo.tags);
      let tagsTemp = [];
      temp.map((item,index)=>{
        tagsTemp.push(item);
      });
      this.setState({
        listTags: tagsTemp,
        image: this.props.newsMKInfo.image,
        changedImage: false,
        changedtags: false,
      });
    }
  }
  componentDidUpdate(){
    if(contentMKDiv){
      if(this.props.newsMKInfo){
        contentMKDiv = document.getElementById('contentNewsMK');
        contentMKDiv.innerHTML = this.props.newsMKInfo.content;
      }
    }
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date;
    return result;
  }
  render() {
    let title = null;
    let date = null;
    let comment = null;
    let img = require('containers/App/maxresdefault.jpg');
    let content = null;
    let tags = null;
    let source = null;
    let author = null;
    if(this.props.newsMKInfo!==null){
      title = this.props.newsMKInfo.title;
      date = this.props.newsMKInfo.timeCreate;
      comment = this.props.newsMKInfo.comments;
      img = this.props.newsMKInfo.image;
      source = this.props.newsMKInfo.source;
      author = this.props.newsMKInfo.author;
      let temp = JSON.parse(this.props.newsMKInfo.tags);
      // if(temp && (temp.size>0||temp.length>0)){
      //   tags = temp.map((item,index) => {
      //     return (<Tag key={index}>{item}</Tag>);
      //   });
      // }
      if(this.state.listTags && (this.state.listTags.size>0 || this.state.listTags.length>0)){
        tags = this.state.listTags.map((item,index)=>{
          return <Tags content={item} key={index} index={index} removeTags={this.removeTags}/>
        });
      }
      
    }
    return (
      <div style={styles.wrapContent}>
        <div style={{paddingBottom: 10,fontWeight: 600,fontSize: 16}}>{title}</div>
        <div style={styles.wrapDate}>
          <div style={styles.date}>{`Ngày cập nhật: ${this.convertTime(date)}`}</div>
          <div style={styles.date}>
            <div>
              <Icon type="message" style={{color:'#00B0FF',marginRight: 2,fontSize: 13}}/>
              <span>{comment}</span>
            </div>
          </div>
        </div>
        <div style={{ display: img==null?'none':"",textAlign: 'center', paddingBottom: 10}}>
          <img src={img} id="imgstore" width='280px' height='220px' />
          <div style={{textAlign: 'center',paddingTop: 5}}> 
            <div style={{width: 280,display: 'flex',margin: 'auto'}}>
              <input type="file" ref="imageNewsEventEdit" onChange={this.loadImage} accept="image/*"/>
              <Button type="primary" onClick={this.updateImage} ghost>Cập nhật ảnh</Button>
            </div>
          </div>
        </div>
        <div id="contentNewsMK">
        </div>
        <div style={{padding: 10}}>
        <div style={{display: "flex"}}>
            <div style={{flex: 1}}> 
              <CusInput type='text' innerRef={(comp) => { this.tagsAdd = comp;}} onKeyPress={this.onkeyPress} placeholder="Nhập từ khóa"/>
            </div>
            <div style={{flexBasic: 100, textAlign: 'center',paddingTop: 6}}>
              <Button type="primary" onClick={this.updateTags} ghost>Cập nhật</Button>
            </div>
          </div>
          {tags}
        </div>
        <div style={{fontWeight: 600,textAlign: 'center'}}>{`Theo: ${author}`}</div>
        <div style={{ paddingLeft: 20, fontStyle: 'italic'}}>{`Nguồn: ${source}`}</div>
      </div>
    );
  }
}

CmarketInfoDetail.propTypes = {

};

export default CmarketInfoDetail;
