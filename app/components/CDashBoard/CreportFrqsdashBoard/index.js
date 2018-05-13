/**
*
* CreportFrqsdashBoard
*
*/

import React from 'react';
import Cfrqschart from '../Cfrqschart'
import CfrqspieChart from '../CfrqspieChart'


class CreportFrqsdashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      COLORS: ['#0088FE', '#00C49F', '#7C4DFF','#FFBB28', '#FF8042', "#82B1FF", "#FFC400", "#F44336", "#388E3C", "#C6FF00", "#EF6C00"],
    };
  }
  render() {
    let chart = false;
    let title = false;
    let piechart = false;
    if(this.props.data &&(this.props.data.size>0 || this.props.data.length>0)){
      chart = (
        <Cfrqschart data={this.props.data}/>
      )
      title = (
        <div style={{borderBottom:'1px solid #cccccc',padding: 7,fontSize: 16,fontWeight: 600}}>Thống kê câu hỏi trên diễn đàn trong 15 ngày vừa qua</div>
      )
      
    }

    if(this.props.reportdata &&(this.props.reportdata.size>0 || this.props.reportdata.length>0)){
      piechart = (
        <div >
          <CfrqspieChart width={350} height={350} data={this.props.reportdata} 
                  innerRadius={50} outerRadius={95} colors={this.state.COLORS}
                  reverseColor={this.props.reverseColor}/>
        </div>
      )
    }
    return (
      <div style={{padding:"0 20px",marginTop: 30,marginBottom: 20}}>
        <div style={{background: '#FFFFFF'}}>
          <div>{title}</div>
          <div style={{display: "flex", textAlign: 'center'}}>
            {chart}
            <div style={{flex: 1,display: 'flex',alignItems: 'center'}}>
              {piechart}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreportFrqsdashBoard.propTypes = {

};

export default CreportFrqsdashBoard;
