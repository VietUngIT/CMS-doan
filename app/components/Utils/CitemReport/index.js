/**
*
* CitemReport
*
*/

import React from 'react';
import styles from './styles'


class CitemReport extends React.Component {
  render() {
    return (
      <div style={styles.wrap}>
        <div style={{padding: "15px 15px 0px 15px"}}>
          <div style={{textAlign: 'center'}}>
            <img src={this.props.icon} width='70px' height='70px' />
          </div>
          <div style={{color:`#${this.props.background}`,textAlign: 'center',fontSize: 30,padding: "5px 0",}}>{this.props.value}</div>
        </div>
        <div style={{padding:7,background:`#${this.props.background}`,textAlign: 'center',color: '#FFF',fontSize: 16,borderBottomRightRadius: 3,borderBottomLeftRadius: 3}}>{this.props.label}</div>
      </div>
    );
  }
}

CitemReport.propTypes = {

};

export default CitemReport;
