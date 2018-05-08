
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import styles from './styles';
import CcateMatketPrice from 'components/CNewsManage_V2/CMarketPrice/CcateMatketPrice'
import ModalAddCateMp from 'components/CNewsManage_V2/CMarketPrice/ModalAddCateMp';
import {
  getListCateMP,
  addCateMP,
  delCateMP,
 } from './actions';
 import {
  selectListCateMP,
  selectErrorCodeCate,
  selectLoading,
 } from './selectors';

export class CateMarketPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddNews: false,
    }
  }
  handleShowModalAdd=()=>{
    this.setState({
      modalAddNews: true,
    });
  }
  handleCloseModalAdd=()=>{
    this.setState({
      modalAddNews: false,
    });
  }
  addNewsHandle=()=>{
    this.handleShowModalAdd();
  }
  componentWillMount(){
    this.props.getListCateMP();
  }
  render() {
    let modalAdd = null;
      modalAdd = (
        <ModalAddCateMp addCateMP={this.props.addCateMP} modalAddNews={this.state.modalAddNews}
         handleCloseModalAdd={this.handleCloseModalAdd} errorCode={this.props.errorCode}/>
      )
    let loading = null;
    if(this.props.loading){
      loading = (
        <div style={styles.loading}>
          <img src={require('containers/App/loading.gif')} style={styles.imageLoading}/>
        </div>
      )
    }
    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="Giá thị trường"
          meta={[
            { name: 'description', content: 'Description of CateMarketPrice' },
          ]}
        />
        {loading}
        {modalAdd}
        <Row>
          <Col span={10}>
            <div style={styles.wrapcontentlistnews}>
              <div style={styles.inlineWrapContentlistnews}>
                <div style={styles.header}>Danh mục tin tức</div>
                <CcateMatketPrice listCate={this.props.listCate} delCateMP={this.props.delCateMP}/>
                <div style={styles.wrapButton}>
                  <Button onClick={this.addNewsHandle} type="primary" icon="plus" size='large' >Thêm mới</Button>
                </div>
              </div>
            </div>
          </Col>
          <Col span={14}>
            {React.Children.toArray(this.props.children)}
          </Col>
        </Row>
      </div>
    );
  }
}

CateMarketPrice.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCate: selectListCateMP(),
  errorCode: selectErrorCodeCate(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateMP: () => dispatch(getListCateMP()),
    addCateMP: (name,image) => dispatch(addCateMP(name,image)),
    delCateMP: (id) => dispatch(delCateMP(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateMarketPrice);
