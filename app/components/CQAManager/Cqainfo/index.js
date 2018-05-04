
import React from 'react';
// import styled from 'styled-components';
import CusSelect from 'components/Utils/CusSelect';
import styles from './styles';

class Cqainfo extends React.Component {
  render() {
    let dropField = false;
    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      dropField = this.props.listField.map((item,index)=>{
        return (<option value={item.id}  key={index}>{item.name}</option>);
      });
    }
    return (
      <div style={{width: '100%', height: '100%'}}>
        <CusSelect type='text' innerRef={(comp) => { this.selectField = comp;}} ref="selectFieldQA">
          {dropField}
        </CusSelect>
        <div style={styles.wrapListQuestion}>

        </div>
      </div>
    );
  }
}

Cqainfo.propTypes = {

};

export default Cqainfo;
