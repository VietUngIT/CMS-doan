/**
*
* PiechartReport
*
*/

import React from 'react';
// import styled from 'styled-components';
import { PieChart, Pie, Sector,Cell} from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle">{`${(percent * 100).toFixed(2)}%`} </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};
class PiechartReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      COLORS: ['#0088FE', '#00C49F', '#7C4DFF','#FFBB28', '#FF8042', "#F44336", "#82B1FF", "#00695C", "#388E3C", "#C6FF00", "#EF6C00"],
      activeIndex: 0,
    };
  }
  onPieEnter=(data,index)=>{
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    let piechart = false;
    if(this.props.data){
      piechart = (
        <PieChart width={this.props.width===null?200:this.props.width} height={this.props.height===null?200:this.props.height}>
          <Pie 
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape} 
            data={this.props.data} 
            innerRadius={this.props.innerRadius}
            outerRadius={this.props.outerRadius} 
            fill="#8884d8"
            onMouseEnter={this.onPieEnter}
            dataKey="value"
          >
          {
            this.props.data.map((entry, index) => {
              let color = 0;
              if(this.props.reverseColor===true){
                color = this.props.colors.length - 1 - (index % this.props.colors.length);
              }else{
                color = index % this.props.colors.length;
              }
              return <Cell key={index} fill={this.props.colors[color]}/>
            })
          }
          </Pie>
        </PieChart>
      )
    }
    
    return (
      <div style={{}}>
      {piechart}
      </div>
    );
  }
}

PiechartReport.propTypes = {

};

export default PiechartReport;
