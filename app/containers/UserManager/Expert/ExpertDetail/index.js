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
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  addDegree=()=>{
    if(this.degreeExpert.value && this.degreeExpert.value.trim()!==""){
      var temp = this.state.degree;
      temp.push(this.degreeExpert.value.trim())
      this.setState({degree: temp})
      this.degreeExpert.value="";
    }
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

  addField=()=>{
    let name = "";
    if(this.props.listSubField && (this.props.listSubField.size>0 || this.props.listSubField.length>0)){
      this.props.listSubField.map((item, index) => {
        if(item.id===this.selectField.value){
          name = item.nameField;   
        }
      })
    }
    var i = 0;
    this.state.listFieldDetail.map((item,index)=>{
      if(item.id===this.selectField.value){
        i++;
      }
    })
    if(i===0){
      var temp = this.state.listFieldDetail;
      temp.push({id:this.selectField.value, idParentField: this.props.expert.idParentField, nameField:name})
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
  render() {
    let name = "";
    let avatar = require('containers/App/fuse.svg');
    let rate = 0;
    let widthRate = 0;
    let numRate = 0;
    let online = false;
    let phone = "";
    let address = "";
    let email = "";
    let desc = "";
    let workPlace = "";
    let fieldName = "";
    let detaiField = "";
    let degree = "";
    let listDegree = false;
    let showListField = false;
    let dropSubField = false;
    let showTags = false;
    if(this.props.expert){
      name = this.props.expert.name;
      if(this.props.expert.avatar!==null){
        avatar = this.props.expert.avatar;
      }
      rate = this.props.expert.rate;
      widthRate = Math.floor((this.props.expert.rate/5)*100);
      numRate = this.props.expert.numRate;
      online = this.props.expert.isOnline;
      phone = this.props.expert.phone;
      address = this.props.expert.address;
      email = this.props.expert.email;
      if(this.props.expert.desc!==null){
        desc = this.props.expert.desc;
      }
      workPlace = this.props.expert.workPlace;
      if(this.props.expert.arrayField && (this.props.expert.arrayField.size>0 || this.props.expert.arrayField.length>0)){
        this.props.expert.arrayField.map((item,index)=>{
          if(index!==0){
            detaiField += (", "+this.capitalizeFirstLetter(item.nameField));
          }else{
            detaiField = this.capitalizeFirstLetter(item.nameField);
          }
          
        })
      }
      let tempDegree = JSON.parse(this.props.expert.degree);
      if(tempDegree && (tempDegree.size>0 || tempDegree.length>0)){
        tempDegree.map((item,index)=>{
          if(index!==0){
            degree += (", "+this.capitalizeFirstLetter(item));
          }else{
            degree = this.capitalizeFirstLetter(item);
          }
        })
      }

      if(this.props.listSubField && (this.props.listSubField.size>0 || this.props.listSubField.length>0)){
        dropSubField = this.props.listSubField.map((item, index) => {
          if(item.idParentField===this.props.expert.idParentField){
            return (<option value={item.id}  key={index}>{item.nameField}</option>)    
          }
        })
      }
    }
    if(this.state.degree && (this.state.degree.size>0 || this.state.degree.length>0)){
      listDegree = this.state.degree.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeDegree}/>
      });
    }
    if(this.state.listFieldDetail && (this.state.listFieldDetail.size>0 || this.state.listFieldDetail.length>0)){
      showListField = this.state.listFieldDetail.map((item,index)=>{
        return <Tags content={item.nameField} key={index} index={item.id} removeTags={this.removeField}/>
      });
    }
    if(this.state.listTags && (this.state.listTags.size>0 || this.state.listTags.length>0)){
      showTags = this.state.listTags.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.removeTags}/>
      });
    }

    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      this.props.listField.map((item,index)=>{
        if(item.id === this.props.expert.idParentField){
          fieldName = item.name;
        }
      })
    }

    let showProfileHTML = false;
    if(this.props.expert){
      showProfileHTML = (
        <div style={{display: this.state.showProfile?"":'none'}}>
          <div >
            <div style={styles.wrapDetail}>
              <div style={styles.wrapTitle}>Thông tin chung</div>
              <div style={styles.wrapBody}>
                <div style={styles.label}>Số điện thoại</div>
                <div style={styles.value}>{phone}</div>
                <div style={styles.label}>Địa chỉ</div>
                <div style={styles.value}>{address}</div>
                <div style={styles.label}>Email</div>
                <div style={styles.value}>{email}</div>
                <div >{desc}</div>
              </div>
            </div>
            <div style={styles.wrapDetail}>
              <div style={styles.wrapTitle}>Nghề nghiệp</div>
              <div style={styles.wrapBody}>
                <div style={styles.label}>Nơi làm việc</div>
                <div style={styles.value}>{workPlace}</div>
                <div style={styles.label}>Lĩnh vực làm việc</div>
                <div style={styles.value}>{fieldName}</div>
                <div style={styles.labelWork}>Chi tiết lĩnh vực làm việc</div>
                <Icon onClick={this.editField} type="edit" style={styles.iconEdit} />
                <div style={{display:this.state.stateEditFieldDetail?'':"none"}}>
                  <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                    <CusSelect type='text' innerRef={(comp) => { this.selectField = comp;}} ref="selectFieldExpert">
                      {dropSubField}
                    </CusSelect>
                    </div>
                    <div style={{flexBasis:100,marginTop: 3,marginLeft: 5}}>
                      <Button onClick={this.addField}>Thêm</Button>
                    </div>
                  </div>
                  <div>{showListField}</div>
                  <div style={{textAlign: 'end', paddingRight: 25, marginTop: 10}}>
                    <Button onClick={this.updateField} type="primary" icon="reload" >Cập nhật</Button>
                    <Button onClick={this.cancleField} type="danger" icon="close" style={{marginLeft: 20}} >Hủy</Button>
                  </div>
                </div>
                <div style={{display:this.state.stateEditFieldDetail?'none':""}}>
                  <div style={styles.value}>{detaiField}</div>
                </div>
                <div style={styles.labelWork}>Bằng cấp</div>
                <Icon onClick={this.editDegree} type="edit" style={styles.iconEdit} />
                <div style={{display:this.state.stateEditDegree?'':"none"}}>
                  <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                      <CusInput type='text' innerRef={(comp) => { this.degreeExpert = comp;}} placeholder="Nhập bằng cấp"/>
                    </div>
                    <div style={{flexBasis:100,marginTop: 3,marginLeft: 5}}>
                      <Button onClick={this.addDegree}>Thêm</Button>
                    </div>
                  </div>
                  <div>{listDegree}</div>
                  <div style={{textAlign: 'end', paddingRight: 25, marginTop: 10}}>
                    <Button onClick={this.updateDegree} type="primary" icon="reload" >Cập nhật</Button>
                    <Button onClick={this.cancleDegree} type="danger" icon="close" style={{marginLeft: 20}} >Hủy</Button>
                  </div>
                </div>
                <div style={{display:this.state.stateEditDegree?'none':""}}>
                  <div style={styles.value}>{degree}</div>
                </div>
              </div>
            </div>
            <div style={styles.wrapDetail}>
              <div style={styles.wrapTitle}>Từ khóa tìm kiếm</div>
              <div style={styles.wrapBody}>
              <div >
                  <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                      <CusInput type='text' innerRef={(comp) => { this.tagsExpert = comp;}} placeholder="Nhập từ khóa"/>
                    </div>
                    <div style={{flexBasis:100,marginTop: 3,marginLeft: 5}}>
                      <Button onClick={this.addTags}>Thêm</Button>
                    </div>
                  </div>
                  <div>{showTags}</div>
                  <div style={{textAlign: 'end', paddingRight: 25, marginTop: 10}}>
                    <Button onClick={this.updateTags} type="primary" icon="reload" >Cập nhật</Button>
                    <Button onClick={this.cancelTags} type="danger" icon="close" style={{marginLeft: 20}} >Hủy</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    let loading = null;
    if(this.props.loading){
      loading = (
        <div style={styles.loading}>
          <img src={require('containers/App/loading.gif')} style={styles.imageLoading}/>
        </div>
      )
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
            <div style={styles.wrapItem}>
              Thông tin cá nhân
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
