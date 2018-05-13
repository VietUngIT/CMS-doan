/**
*
* CreportPiechartDashBoard
*
*/

import React from 'react';
// import styled from 'styled-components';
import PiechartReport from 'components/Utils/PiechartReport';
import CitemNote from '../CitemNote'


class CreportPiechartDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      COLORS: ['#0088FE', '#00C49F', '#7C4DFF','#FFBB28', '#FF8042', "#82B1FF", "#FFC400", "#F44336", "#388E3C", "#C6FF00", "#EF6C00"],
    };
  }
  render() {
    let pieChart = false;
    let noteChart = false;
    let title = false;
    if(this.props.data){
      pieChart= (
        <div style={{display: 'flex',alignItems: 'center',height: "100%", flexBasic: this.props.width}}>
          <PiechartReport width={this.props.width} height={this.props.height} data={this.props.data} 
                  innerRadius={this.props.innerRadius} outerRadius={this.props.outerRadius} colors={this.state.COLORS}
                  reverseColor={this.props.reverseColor}/>
        </div>)
        noteChart = this.props.data.map((item,index)=>{
          let color = 0;
          if(this.props.reverseColor===true){
            color = this.state.COLORS.length - 1 - (index % this.state.COLORS.length);
          }else{
            color = index % this.state.COLORS.length;
          }
          return <CitemNote key={index} value={item.value} totalValue={this.props.total} label={item.name} color={this.state.COLORS[color]}/>
        });

      
      
    }
    if(this.props.title){
      title = (
        <div style={{borderBottom:'1px solid #cccccc',padding: 7,fontSize: 16,fontWeight: 600}}>{this.props.title}</div>
      )
    }
    return (
      <div style={{height: "100%",boxShadow: '1px 1px 1px #cecece',}}>
        {title}
        <div style={{height: "100%", display: "flex",alignItems: "center"}}>
          {pieChart}
          <div style={{width: "100%", padding: 10,marginLeft: 10}}>
            <div style={{padding: "40px 0"}}>
              {noteChart}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreportPiechartDashBoard.propTypes = {

};

export default CreportPiechartDashBoard;
