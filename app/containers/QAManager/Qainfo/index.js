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
import ModalAddQa from 'components/CQAManager/ModalAddQa';
import CqaDetail from 'components/CQAManager/CqaDetail';
import Cqainfo from 'components/CQAManager/Cqainfo';
import {message,} from 'antd';
import {
  getListField,
  getListQA,
  addQA,
  setIdFieldSelected,
  setQADetail,
  delQA,
  editQA,
 } from './actions';
 import {
  selectListField,
  selectLoading,
  selectPage,
  selectTotal,
  selectListQA,
  selectError,
  selectIdFieldPage,
  selectQADetail,
  selectErrorEdit,
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
  constructor(props) {
    super(props);
    this.state = {
      modalAdd: false,
    }
  }

  handleShowModalAdd=()=>{
    this.setState({
      modalAdd: true,
    });
    
  }
  handleCloseModalAdd=()=>{
    this.setState({
      modalAdd: false,
    });
  }
  addQA=()=>{
    this.handleShowModalAdd();
  }
  componentWillMount(){
    if(!(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0))){
      this.props.getListField();
    }
  }
  componentDidMount(){
    // CKEDITOR.replace( 'html_link_content');
  }
  componentWillReceiveProps(nextProps){
    if(this.props.listField!==nextProps.listField && !(this.props.listField.size>0||this.props.listField.length>0) && nextProps.listField && (nextProps.listField.size>0||nextProps.listField.length>0)){
      this.props.getListQA(0,nextProps.listField[0].id)
    }
  }
  onChange=(page)=>{
    this.props.getListQA(page-1,this.props.idField);
  }

  render() {
    let modalAdd = null;
    modalAdd = (
      <ModalAddQa modalAdd={this.state.modalAdd} handleCloseModalAdd={this.handleCloseModalAdd}
        listField={this.props.listField} errorCode={this.props.errorCode} addQA={this.props.addQA}/>
    )

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

    let listQuestion = false;
    if(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0)){
      listQuestion = (
        <Cqainfo getListQA={this.props.getListQA} setIdFieldSelected={this.props.setIdFieldSelected} listField={this.props.listField}
         listQA={this.props.listQA} setQADetail={this.props.setQADetail}/>
      )
    }

    let showQADetail = false;
    if(this.props.qaDetail){
      showQADetail = (
        <CqaDetail qaDetail={this.props.qaDetail} delQA={this.props.delQA}
        errorCodeEdit={this.props.errorCodeEdit} editQA={this.props.editQA}/>
      )
    }
    let page = null;
    page =(
      <div style={{paddingRight: '3%',textAlign: 'center'}}>
        <Pagination
          style={{display: 'inline-block'}}
          total={this.props.totalItem?this.props.totalItem:0}
          pageSize={4}
          defaultCurrent={1}
          current={this.props.curentPage?this.props.curentPage+1:1}
          onChange={this.onChange}
        />
        <div style={{display:"inline-block",float:'right',border:'1px solid #c4c4c4',borderRadius:'3px',padding:'4px 10px',marginLeft:'10px',fontSize:'13px'}}>
          {this.props.curentPage+1}/{this.props.totalItem>0?(this.props.totalItem%4==0?this.props.totalItem/4:parseInt(this.props.totalItem/4)+1):0}
        </div>
    </div>
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
        {modalAdd}
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
              {page}
            </div>
            
          </Col>
          <Col span={14}>
            <div style={styles.wrapcontentDetail}>
              {showQADetail}
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
  totalItem: selectTotal(),
  listQA: selectListQA(),
  errorCode: selectError(),
  idField: selectIdFieldPage(),
  qaDetail: selectQADetail(),
  errorCodeEdit: selectErrorEdit(),
});

function mapDispatchToProps(dispatch) {
  return {
    editQA:(title,question,answer,id) => dispatch(editQA(title,question,answer,id)),
    delQA:(id) => dispatch(delQA(id)),
    setQADetail:(data) => dispatch(setQADetail(data)),
    setIdFieldSelected:(id) => dispatch(setIdFieldSelected(id)),
    addQA:(title,question,answer,id) => dispatch(addQA(title,question,answer,id)),
    getListField: () => dispatch(getListField()),
    getListQA:(page,id) => dispatch(getListQA(page,id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Qainfo);
