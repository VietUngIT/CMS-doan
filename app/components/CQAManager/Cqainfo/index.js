
import React from 'react';
// import styled from 'styled-components';
import CusSelect from 'components/Utils/CusSelect';
import CitemQa from '../CitemQa';
import styles from './styles';
import CusArea from 'components/Utils/CusArea';

class Cqainfo extends React.Component {
  componentWillMount(){
    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      if(this.props.listField[0]!==null)
        this.props.setIdFieldSelected(this.props.listField[0].id);
    }
  }
  onChangeSelect=()=>{
    this.props.setIdFieldSelected(this.selectField.value);
    this.props.getListQA(0,this.selectField.value)
  }
  render() {
    let dropField = false;
    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      dropField = this.props.listField.map((item,index)=>{
        return (<option value={item.id}  key={index}>{item.name}</option>);
      });
    }

    let listQuestion = false;
    if(this.props.listQA && (this.props.listQA.size>0 || this.props.listQA.length>0)){
      listQuestion = this.props.listQA.map((item,index)=>{
        if(item!==null)
          return (<CitemQa key={index} data={item} index={index} setQADetail={this.props.setQADetail}/>)
      })
    }
    return (
      <div style={{width: '100%', height: '100%'}}>
        <CusSelect type='text' onChange={this.onChangeSelect} innerRef={(comp) => { this.selectField = comp;}} ref="selectFieldQA">
          {dropField}
        </CusSelect>
        <div style={styles.wrapListQuestion}>
          {listQuestion}
        </div>
        
      </div>
    );
  }
}

Cqainfo.propTypes = {

};

export default Cqainfo;
