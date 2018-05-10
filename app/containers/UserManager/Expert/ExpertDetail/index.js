/*
 *
 * ExpertDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import CusInput from 'components/Utils/CusInput';
import Tags from 'components/Utils/Tags';
import CusSelect from 'components/Utils/CusSelect';
import styles from './styles';
import CexpertInfoDetail from 'components/CUserManager/CExpert/CexpertInfoDetail'
import {
  getListField,
  getExpertDetail,
  updateDegree,
  getListSubField,
  updateSubField,
  updateTags,
 } from './actions';
 import {
  selectListField,
  selectExpertDetail,
  selectLoading,
  selectSubField,
 } from './selectors';

export class ExpertDetail extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showProfile: true,
        stateEditDegree: false,
        stateEditFieldDetail: false,
        stateEditTags: false,
        degree: [],
        listFieldDetail: [],
        listTags: [],
      };
  }
  componentWillMount(){
    if(!(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0))){
      this.props.getListField();
    }
    if(!(this.props.listSubField && (this.props.listSubField.size>0 || this.props.listSubField.length>0))){
      this.props.getListSubField();
    }
    this.props.getExpertDetail(this.props.params.id_expert);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_expert !== nextProps.params.id_expert){
      this.props.getExpertDetail(nextProps.params.id_expert);
    }
    if(nextProps.expert && this.props.expert!==nextProps.expert){
      let tempDegree = JSON.parse(nextProps.expert.degree);
      this.setState((prevState) => ({
        degree: tempDegree
      }))
      let tempField = [];
      nextProps.expert.arrayField.map((item,index)=>{
        tempField.push(item)
        
      })
      this.setState((prevState) => ({
        listFieldDetail: tempField
      }))
    }
    if(nextProps.expert){
      let tempTags = JSON.parse(nextProps.expert.tags);
      this.setState((prevState) => ({
        listTags: tempTags
      }))
    }
    
  }
  addTags=(value)=>{
    var temp = this.state.listTags;
    temp.push(value)
    this.setState({listTags: temp})
  }
  removeTags=(idx)=>{
    this.setState({
      listTags: this.state.listTags.filter((item,index)=>{
        if(index!==idx) return item;
      })
    })
  }
  updateTags=()=>{
    if(this.props.expert){
      this.props.updateTags(this.state.listTags,this.props.expert.phone)
    }
  }
  cancelTags=()=>{
    if(this.props.expert){
      let tempTags = JSON.parse(this.props.expert.tags);
      this.setState({
        listTags: tempTags,
      })
    }
  }

  addDegree=(value)=>{
    var temp = this.state.degree;
    temp.push(value)
    this.setState({degree: temp})
  }
  removeDegree=(idx)=>{
    this.setState({
      degree: this.state.degree.filter((item,index)=>{
        if(index!==idx) return item;
      })
    })
  }
  editDegree=()=>{
    this.setState({
      stateEditDegree: true,
    })
  }
  updateDegree=()=>{
    if(this.props.expert){
      this.props.updateDegree(this.state.degree,this.props.expert.phone)
    }
    this.setState({stateEditDegree: false,})
  }
  cancleDegree=()=>{
    if(this.props.expert){
      let tempDegree = JSON.parse(this.props.expert.degree);
      this.setState({
        degree: tempDegree,
      })
    }
    this.setState({stateEditDegree: false,})
  }

  addField=(value)=>{
    let name = "";
    if(this.props.listSubField && (this.props.listSubField.size>0 || this.props.listSubField.length>0)){
      this.props.listSubField.map((item, index) => {
        if(item.id===value){
          name = item.nameField;   
        }
      })
    }
    var i = 0;
    this.state.listFieldDetail.map((item,index)=>{
      if(item.id===value){
        i++;
      }
    })
    if(i===0){
      var temp = this.state.listFieldDetail;
      temp.push({id:value, idParentField: this.props.expert.idParentField, nameField:name})
      this.setState({listFieldDetail: temp})
    }
    
  }
  removeField=(idx)=>{
    this.setState({
      listFieldDetail: this.state.listFieldDetail.filter((item,index)=>{
        if(item.id!==idx) return item;
      })
    })
  }
  editField=()=>{
    this.setState({
      stateEditFieldDetail: true,
    })
  }
  updateField=()=>{
    if(this.props.expert){
      var ids = [];
      this.state.listFieldDetail.map((item,index)=>{
        ids.push(item.id);
      });
      this.props.updateSubField(ids,this.props.expert.phone)
    }
    this.setState({stateEditFieldDetail: false,})
  }
  cancleField=()=>{
    let tempField = [];
      this.props.expert.arrayField.map((item,index)=>{
        tempField.push(item)
        
      })
      this.setState((prevState) => ({
        listFieldDetail: tempField
      }))
    this.setState({stateEditFieldDetail: false,})
  }

  showProfile=()=>{
    this.setState({
      showProfile: true,
    });
  }
  render() {

    let showProfileHTML = false;
    if(this.props.expert){
      showProfileHTML = (<CexpertInfoDetail expert={this.props.expert} listField={this.props.listField} listSubField={this.props.listSubField}
                          updateSubField={this.props.updateSubField} updateDegree={this.props.updateDegree} updateTags={this.props.updateTags}
                          showProfile={this.state.showProfile} listTags={this.state.listTags} addTags={this.addTags} updateTags={this.updateTags}
                          removeTags={this.removeTags} cancelTags={this.cancelTags} degree={this.state.degree} addDegree={this.addDegree} updateDegree={this.updateDegree}
                          removeDegree={this.removeDegree} cancleDegree={this.cancleDegree} editDegree={this.editDegree} stateEditDegree={this.state.stateEditDegree}
                          listFieldDetail={this.state.listFieldDetail} addField={this.addField} updateField={this.updateField}
                          removeField={this.removeField} cancleField={this.cancleField} editField={this.editField} stateEditFieldDetail={this.state.stateEditFieldDetail}/>)
    }
    
    let loading = null;
    if(this.props.loading){
      loading = (
        <div style={styles.loading}>
          <img src={require('containers/App/loading.gif')} style={styles.imageLoading}/>
        </div>
      )
    }
    let avatar = require('containers/App/fuse.svg');
    let online = false;
    let rate = 0;
    let widthRate = 0;
    let numRate = 0;
    let name = "";
    if(this.props.expert){
      if(this.props.expert.avatar!==null){
        avatar = this.props.expert.avatar;
      }
      online = this.props.expert.isOnline;
      rate = this.props.expert.rate;
      widthRate = Math.floor((this.props.expert.rate/5)*100);
      numRate = this.props.expert.numRate;
      name = this.props.expert.name;
    }
    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="Chuyên gia"
          meta={[
            { name: 'description', content: 'Description of ExpertDetail' },
          ]}
        />
        {loading}
        <Row>
          <Col span={7}>
            <div style={styles.wrapAvatar}>
              <div style={{textAlign: 'center'}}>
                <img src={avatar} id="imgstore" style={styles.avatar}/>
              </div>
              <div style={styles.labelName}>
                {name}
              </div>
              <div style={{textAlign: 'center', marginTop: 10}}>
                <div style={{display: 'inline-block',padding: '2px 10px',background: `${online?'#45ff65':"#9E9E9E"}`,borderRadius: 40}}>{online?"online":"offline"}</div>
              </div>
              <div style={{display: 'flex',marginTop: 7}}>
                <div style={{flex: 1,minWidth: 40,textAlign: 'end',paddingRight: 5}}>{`${rate}/5`}</div>
                <div style={{flex: 3}}>
                  <div style={{padding: '1px 5px 0px 0px'}}>
                    <div style={{height: 12,background: '#ffbf00',width: `${widthRate}%`,display: 'inline-block',borderTopLeftRadius: 7,borderBottomLeftRadius: 7, borderTopRightRadius: rate==5?7:0,borderBottomRightRadius: rate==5?7:0}}></div>
                    <div style={{height: 12,background: '#c0c0c0',width: `${100-widthRate}%`,display: 'inline-block',borderTopRightRadius: 7,borderBottomRightRadius: 7,borderTopLeftRadius: rate==0?7:0,borderBottomLeftRadius: rate==0?7:0}}></div>
                  </div>
                </div>
                <div style={{flex: 1,minWidth: 40,display: 'flex'}}>
                  <div style={{flex: 3,textAlign: 'end'}}>{numRate}</div>
                  <div style={{flex: 1,fontWeight: 600,paddingLeft: 2}}><Icon type="usergroup-add" /></div>
                </div>
              </div>
            </div>
            <div style={styles.wrapItem} onClick={this.showProfile}>
              <div style={{color: this.state.showProfile?"#2962FF":"#000000"}}>Thông tin cá nhân</div>
            </div>
          </Col>
          <Col span={17}>
            {showProfileHTML}
          </Col>
        </Row>
      </div>
    );
  }
}

ExpertDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listField: selectListField(),
  expert: selectExpertDetail(),
  loading: selectLoading(),
  listSubField: selectSubField(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListSubField:() => dispatch(getListSubField()),
    getListField: () => dispatch(getListField()),
    getExpertDetail: (id) => dispatch(getExpertDetail(id)),
    updateDegree: (degree,phone) => dispatch(updateDegree(degree,phone)),
    updateSubField: (ids,phone) => dispatch(updateSubField(ids,phone)),
    updateTags: (tags,phone) => dispatch(updateTags(tags,phone)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDetail);
