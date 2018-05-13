/**
*
* CpieChartRateExpert
*
*/

import React from 'react';
// import styled from 'styled-components';
import styles from './styles';
import { PieChart, Pie, Sector,Cell} from 'recharts';
import { Row, Col, Button, Icon } from 'antd';

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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
class CpieChartRateExpert extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      COLORS: ['#0088FE', '#00C49F', '#7C4DFF','#FFBB28', '#FF8042'],
      activeIndex: 0,
    };
  }
  componentWillMount(){
    this.setState({
      activeIndex: this.props.activeInitPieChart,
    })
  }
  onPieEnter=(data,index)=>{
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    let piechart = false;
    let itemTable = false;
    if(this.props.rateData &&(this.props.rateData.size>0 || this.props.rateData.length>0)){
      itemTable = this.props.rateData.map((item, index) => {
        return (<Row style={styles.rowTable} key={index}>
                  <Col style={styles.firstCell}span={8}>{item.name}</Col>
                  <Col style={styles.middleCell} span={8}><div style={{height: 20,width: '40%',background: `${this.state.COLORS[index % this.state.COLORS.length]}`,display: 'inline-block'}}></div></Col>
                  <Col style={styles.lastCell} span={8}>{item.value}</Col>
                </Row>);
        });

      piechart = (
        <div style={styles.wrapDetail}>
          <div style={styles.wrapTitle}>Thống kê đánh giá của người dùng cho chuyên gia</div>
          <div style={styles.wrapBody}>
            <div style={{display: 'flex'}}>
              <div style={{flex: 1,paddingTop: '3%'}}>
                <Row style={styles.headerTable}>
                  <Col style={styles.firstHeaderCell}span={8}>Tên</Col>
                  <Col style={styles.middleHeaderCell} span={8}>Màu sắc</Col>
                  <Col style={styles.lastHeaderCell} span={8}>Số đánh giá</Col>
                </Row>
                {itemTable}
              </div>
              <div>
                <PieChart width={400} height={265}>
                  <Pie 
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape} 
                    data={this.props.rateData} 
                    innerRadius={30}
                    outerRadius={90} 
                    fill="#8884d8"
                    onMouseEnter={this.onPieEnter}
                    dataKey="value"
                  >
                  {
                    this.props.rateData.map((entry, index) => <Cell key={index} fill={this.state.COLORS[index % this.state.COLORS.length]}/>)
                  }
                  </Pie>
                </PieChart>
              </div>     
            </div>     
          </div>
       </div>  
      )
      
    }
    return (
      <div>
        {piechart}
      </div>
    );
  }
}

CpieChartRateExpert.propTypes = {

};

export default CpieChartRateExpert;
