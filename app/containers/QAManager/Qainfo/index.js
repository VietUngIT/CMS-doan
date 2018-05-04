/*
 *
 * Qainfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import styles from './styles';
import styled from 'styled-components';

import Cqainfo from 'components/CQAManager/Cqainfo'
import {message,} from 'antd';
import {
  getListField,
  getListQA,
 } from './actions';
 import {
  selectListField,
  selectLoading,
  selectPage,
  selectTotal,
  selectListQA,
 } from './selectors';

const DIV = styled.div`
  display: inline-block;
  padding: 5px 12px;
  background: #00B0FF;
  border-radius: 15px;
  box-shadow: 2px 3px 10px #808080;
  cursor: pointer;
  &:hover {
    background: #0091EA;
    box-shadow: 4px 4px 9px #808080;
    cursor: pointer;
  }
`;


export class Qainfo extends React.Component {
  addQA=()=>{
    console.log("ok")
    message.success("Ok đẹp rồi.");
  }
  componentWillMount(){
    if(!(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0))){
      this.props.getListField();
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps")
    console.log(nextProps.listField)
    if(this.props.listField!==nextProps.listField && !(this.props.listField.size>0||this.props.listField.length>0) && nextProps.listField && (nextProps.listField.size>0||nextProps.listField.length>0)){
      console.log("componentWillReceiveProps-in")
      console.log(nextProps.listField[0].id)
      this.props.getListQA(0,nextProps.listField[0].id)
    }
  }
  render() {
    let btnAddQuestionQA = (
      <DIV onClick={this.addQA}>
        <Icon style={styles.iconBtnAddQA} type="plus-circle-o" />
        <span style={styles.labelBtnAddQA}>Thêm câu hỏi</span>
      </DIV>
    )
    let loading = null;
    if(this.props.loading){
      loading = (
        <div style={styles.loading}>
          <img src={require('containers/App/loading.gif')} style={styles.imageLoading}/>
        </div>
      )
    }

    let listQuestion = (
      <Cqainfo listField={this.props.listField}/>
    )
    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="Qainfo"
          meta={[
            { name: 'description', content: 'Description of Qainfo' },
          ]}
        />
        {loading}
        <Row>
          <Col span={24}>
            <div style={styles.wrapBtnQA}>
              {btnAddQuestionQA}
            </div>
          </Col>
        </Row>
        <Row style={{height: '80%'}}>
          <Col span={10} >
            <div style={styles.wrapcontentlistnews}>
              {listQuestion}
              
            </div>
          </Col>
          <Col span={14}>
            <div style={styles.wrapcontentDetail}>
              
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Qainfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listField: selectListField(),
  loading: selectLoading(),
  curentPage: selectPage(),
  total: selectTotal(),
  listQA: selectListQA(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListField: () => dispatch(getListField()),
    getListQA:(page,id) => dispatch(getListQA(page,id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Qainfo);
