
import React from 'react';
// import styled from 'styled-components';
import CitemExpert from '../CitemExpert';

class ClistExpert extends React.Component {
  render() {
    let listItem = null;
    if(this.props.listExpert && (this.props.listExpert.size>0||this.props.listExpert.length>0)){
      listItem = this.props.listExpert.map((item,index) => {
        return (<CitemExpert key={index} data={item}/>);
      });
    }
    return (
      <div>
        {listItem}
      </div>
    );
  }
}

ClistExpert.propTypes = {

};

export default ClistExpert;
