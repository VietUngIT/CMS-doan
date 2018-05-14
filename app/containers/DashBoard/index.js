
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import CitemReport from 'components/Utils/CitemReport';
import CreportPiechartDashBoard from 'components/CDashBoard/CreportPiechartDashBoard';
import CreportFrqsdashBoard from 'components/CDashBoard/CreportFrqsdashBoard';
import {
  getDashBoard,
 } from './actions';
 import {
  selectLoading,
  selectNumExpert,
  selectReportExpert,
  selectNumUser,
  selectNumQA,
  selectReportQA,
  selectNumFRQS,
  selectReportFRQS,
  selectReportFRQSByDay,
  selectgetSuccess,
  selectStartTime,
  selectEndTime,
 } from './selectors';

export class DashBoard extends React.Component { 
  componentWillMount(){
    var date = new Date();
    if(!this.props.getDashBoardSuccess || this.props.endTime<date.getTime()){
      this.props.getDashBoard();
    }
  }
  render() {
    let loading = null;
    if(this.props.loading){
      loading = (
        <div style={styles.loading}>
          <img src={require('containers/App/loading.gif')} style={styles.imageLoading}/>
        </div>
      )
    }
    let reportPieChartShow = false;
    let numShow = false;
    let frqs = false;
    if(this.props.getDashBoardSuccess){
      numShow = (<div style={{display: 'flex', padding: '0 20px'}}>
        <div style={{flex: 1}}>
          <div style={{width: '90%',maxWidth: 320}}>
            <CitemReport background="5cb85c" value={this.props.numExpert} label="Số lượng chuyên gia" icon={require('./experticon.png')}/>
          </div>
        </div>
        <div style={{flex: 1}}>
          <div style={{width: '90%',margin: 'auto',maxWidth: 320}}>
            <CitemReport background="4CB1CF" value={this.props.numUser} label="Số lượng người dùng" icon={require('./iconsuser.png')}/>
          </div>
        </div>
        <div style={{flex: 1}}>
          <div style={{width: '90%',float: 'right',maxWidth: 320}}>
            <CitemReport background="F0433D" value={this.props.numQA} label="Số lượng câu hỏi FAQ" icon={require('./iconsfaq.png')}/>
          </div>
        </div>
      </div>
      )
      reportPieChartShow = (
        <div style={{display: 'flex', padding: '0 20px', marginTop: 30}}>
          <div style={{flex: 1}}>
            <div style={{width: '96%',background: '#FFF'}}>
              <CreportPiechartDashBoard width={200} height={200} innerRadius={50} outerRadius={90}
                data={this.props.reportExpert} reverseColor={false} total={this.props.numExpert}
                title="Thống kê chuyên gia theo lĩnh vực"/>
            </div>
          </div>
          <div style={{flex: 1}}>
            <div style={{width: '96%',background: '#FFF',float: 'right'}}>
              <CreportPiechartDashBoard width={200} height={200} innerRadius={50} outerRadius={90}
                data={this.props.reportQA} reverseColor={true} total={this.props.numQA}
                title="Thống kê số lượng câu hỏi FAQ theo lĩnh vực"/>
            </div>
          </div>
        </div>
      )
      if(this.props.reportFRQSByDay &&(this.props.reportFRQSByDay.size>0 || this.props.reportFRQSByDay.length>0)){
        frqs = (
          <CreportFrqsdashBoard data={this.props.reportFRQSByDay} reportdata={this.props.reportFRQS}/>
        )
      }
    }
    return (
      <div>
        <Helmet
          title="Trang chủ"
          meta={[
            { name: 'description', content: 'Description of DashBoard' },
          ]}
        />
        {loading}
        {numShow}
        {reportPieChartShow}
        {frqs}
      </div>
    );
  }
}

DashBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  numExpert: selectNumExpert(),
  reportExpert: selectReportExpert(),
  numUser: selectNumUser(),
  numQA: selectNumQA(),
  reportQA: selectReportQA(),
  numFRQS: selectNumFRQS(),
  reportFRQS: selectReportFRQS(),
  reportFRQSByDay: selectReportFRQSByDay(),
  getDashBoardSuccess: selectgetSuccess(),
  starTime: selectStartTime(),
  endTime: selectEndTime(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDashBoard:() => dispatch(getDashBoard()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
