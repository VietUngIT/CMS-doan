/**
*
* CitemNote
*
*/

import React from 'react';
// import styled from 'styled-components';
import Progress from 'components/Utils/Progress';

class CitemNote extends React.Component {
  render() {
    let item = false;
    if( this.props.totalValue && this.props.label &&this.props.color){
      let percent = (this.props.value/this.props.totalValue * 100).toFixed(2);
      item = (
        <div style={{display: "flex"}}>
          <div style={{width:35, height: 35, background:`${this.props.color}`, borderRadius: 20,marginRight: 5}}></div>
          <div style={{flex: 1}}>
            <div>
              <div style={{display: 'inline-block'}}>{this.props.label}</div>
              <div style={{display: 'inline-block', float: 'right'}}>{this.props.value}</div>
            </div>
            <div><Progress percent={percent} bgColor={this.props.color} secondBgColor={"E0E0E0"} height={5}/></div>
          </div>
        </div>
      )
    }
    return (
      <div style={{marginBottom: 10}}>
        {item}
      </div>
    );
  }
}

CitemNote.propTypes = {

};

export default CitemNote;
