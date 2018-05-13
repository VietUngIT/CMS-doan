/**
*
* Progress
*
*/

import React from 'react';
// import styled from 'styled-components';


class Progress extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let progress = false;
    if(this.props.percent && this.props.bgColor && this.props.secondBgColor && this.props.height){
      let radius = Math.floor(this.props.height/2)
      progress = (
        <div style={{background:`#${this.props.secondBgColor}`,borderRadius:`${radius}px`,height: `${this.props.height}px`}}>
          <div style={{height: `${this.props.height}px`,background:`${this.props.bgColor}`,borderRadius:`${radius}px`,width:`${this.props.percent}%`,maxHeight: 15,minHeight:5,marginTop:`${12-this.props.height}px` }}></div>
        </div>
      )
    }
    return (
      <div>
        {progress}
      </div>
    );
  }
}

Progress.propTypes = {

};

export default Progress;
