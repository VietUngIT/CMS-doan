/**
*
* Cfrqschart
*
*/

import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,Label } from 'recharts';
import styles from './styles';
import CcustomTooltip from 'components/CUserManager/CExpert/CcustomTooltip'


class Cfrqschart extends React.Component {
  render() {
    console.log("render - width:"+this.props.width)
    let chart = false;
    if(this.props.data &&(this.props.data.size>0 || this.props.data.length>0)){
      chart = (
        <div style={styles.wrapDetail}>
          <div style={styles.wrapBody}>
            <AreaChart width={this.props.width>0?this.props.width:600} height={350} data={this.props.data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date" padding={{left: 10, right: 10}}>
                <Label value="Thời gian" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis label={{ value: 'Số câu hỏi', angle: -90, position: 'insideLeft' }}/>
              <Tooltip cursor={{ stroke: 'red', strokeWidth: 1 }}  content={<CcustomTooltip labelTooltip="Số lượng"/>}/>
              <Area name="Số lượng" type='monotone' dataKey='countComment' stroke='#2979FF' fill='#2979FF' activeDot={{r: 8}}/>
            </AreaChart>    
            <div style={styles.wrapTitle}>Thống kế số lượng câu hỏi trên diễn đàn theo ngày</div>
          </div>
          
       </div>  
      )
    }
    return (
      <div>
        {chart}
      </div>
    );
  }
}

Cfrqschart.propTypes = {

};

export default Cfrqschart;
