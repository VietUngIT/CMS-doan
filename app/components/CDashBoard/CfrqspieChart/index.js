/**
*
* CfrqspieChart
*
*/

import React from 'react';
import {PieChart, Pie, Sector, Cell} from 'recharts';
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
      <text x={cx} y={cy} textAnchor="middle" fill={fill}>{payload.name}</text>
      <text x={cx} y={cy} dy={18} textAnchor="middle" fill={fill}>{`${(percent * 100).toFixed(2)}%`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value}`}</text>
      
    </g>
  );
};

class CfrqspieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onPieEnter=(data, index)=>{
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    let piechart = false;
    let title = false;
    if(this.props.data){
      piechart = (
        <div style={{display: "inline-block", margin: "auto"}}>
          <PieChart width={this.props.width===null?300:this.props.width} height={this.props.height===null?300:this.props.height}>
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
        </div>
      )
      title = (
        <div style={{padding: '8px 15px',fontSize: 16,textAlign: 'center',fontStyle: 'italic',}}>Thống kế số lượng câu hỏi trên diễn đàn theo lĩnh vực</div>
      )
    }
    
    return (
      <div>
       {piechart}
       {title}
      </div>
    );
  }
}

CfrqspieChart.propTypes = {

};

export default CfrqspieChart;
