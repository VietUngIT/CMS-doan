/**
*
* CstatiticCommentExpert
*
*/

import React from 'react';
// import styled from 'styled-components';
import styles from './styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label } from 'recharts';
import CcustomTooltip from '../CcustomTooltip'

class CstatiticCommentExpert extends React.Component {
  render() {
    let chart = false;
    if(this.props.statiticComment &&(this.props.statiticComment.size>0 || this.props.statiticComment.length>0)){
      chart = (
        <div style={styles.wrapDetail}>
          <div style={styles.wrapTitle}>Thống kế tham gia diễn đàn theo ngày của chuyên gia</div>
          <div style={styles.wrapBody}>
            <LineChart width={700} height={300} data={this.props.statiticComment}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date" padding={{left: 10, right: 10}}>
                <Label value="Thời gian" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis label={{ value: 'Số bình luận', angle: -90, position: 'insideLeft' }}/>
              <Tooltip cursor={{ stroke: 'red', strokeWidth: 1 }} content={<CcustomTooltip label="Số câu hỏi"/>}/>
              <Legend verticalAlign="top" height={36}/>
              <Line name="Số bình luận" type="monotone" dataKey="countComment" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>      
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

CstatiticCommentExpert.propTypes = {

};

export default CstatiticCommentExpert;
