/**
*
* CexpertInfoDetail
*
*/

import React from 'react';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import CusInput from 'components/Utils/CusInput';
import Tags from 'components/Utils/Tags';
import CusSelect from 'components/Utils/CusSelect';
import styles from './styles';


class CexpertInfoDetail extends React.Component { 
  constructor(props) {
    super(props);
      this.state = {
        stateEditFieldDetail: false,
      };
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  

 
  addField=()=>{
    this.props.addField(this.selectField.value)
  }
  
  addTags=()=>{
    if(this.tagsExpert.value && this.tagsExpert.value.trim()!==""){
      this.props.addTags(this.tagsExpert.value.trim())
      this.tagsExpert.value="";
    }
  }
  addDegree=()=>{
    if(this.degreeExpert.value && this.degreeExpert.value.trim()!==""){
      this.props.addDegree(this.degreeExpert.value.trim())
      this.degreeExpert.value="";
    }
  }
  render() {
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
    if(this.props.degree && (this.props.degree.size>0 || this.props.degree.length>0)){
      listDegree = this.props.degree.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.props.removeDegree}/>
      });
    }
    if(this.props.listFieldDetail && (this.props.listFieldDetail.size>0 || this.props.listFieldDetail.length>0)){
      showListField = this.props.listFieldDetail.map((item,index)=>{
        return <Tags content={item.nameField} key={index} index={item.id} removeTags={this.props.removeField}/>
      });
    }
    if(this.props.listTags && (this.props.listTags.size>0 || this.props.listTags.length>0)){
      showTags = this.props.listTags.map((item,index)=>{
        return <Tags content={item} key={index} index={index} removeTags={this.props.removeTags}/>
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
                <Icon onClick={this.props.editField} type="edit" style={styles.iconEdit} />
                <div style={{display:this.props.stateEditFieldDetail?'':"none"}}>
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
                    <Button onClick={this.props.updateField} type="primary" icon="reload" >Cập nhật</Button>
                    <Button onClick={this.props.cancleField} type="danger" icon="close" style={{marginLeft: 20}} >Hủy</Button>
                  </div>
                </div>
                <div style={{display:this.state.stateEditFieldDetail?'none':""}}>
                  <div style={styles.value}>{detaiField}</div>
                </div>
                <div style={styles.labelWork}>Bằng cấp</div>
                <Icon onClick={this.props.editDegree} type="edit" style={styles.iconEdit} />
                <div style={{display:this.props.stateEditDegree?'':"none"}}>
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
                    <Button onClick={this.props.updateDegree} type="primary" icon="reload" >Cập nhật</Button>
                    <Button onClick={this.props.cancleDegree} type="danger" icon="close" style={{marginLeft: 20}} >Hủy</Button>
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
                    <Button onClick={this.props.updateTags} type="primary" icon="reload" >Cập nhật</Button>
                    <Button onClick={this.props.cancelTags} type="danger" icon="close" style={{marginLeft: 20}} >Hủy</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
    return (
      <div style={{display: this.props.showProfile?"":'none'}}>
        {showProfileHTML}
      </div>
    );
  }
}

CexpertInfoDetail.propTypes = {

};

export default CexpertInfoDetail;
