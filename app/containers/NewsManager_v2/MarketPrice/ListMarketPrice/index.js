/*
 *
 * ListMarketPrice
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import ClistMarketPrice from 'components/CNewsManage_V2/CMarketPrice/ClistMarketPrice';
import ModalAddNewsMp from 'components/CNewsManage_V2/CMarketPrice/ModalAddNewsMp'
import {
  getListMP,
  deleteNewsMP,
  addNewsMP,
} from './actions';
import {
  setLoading,
} from '../CateMarketPrice/actions';
import {
  selectGetListMP,
  selectPageGetListMP,
  selectTotalItemListMP,
  selectStateDelMP,
  selectErrorCode,
} from './selectors';

export class ListMarketPrice extends React.Component {
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
    this.props.getListMP(this.props.params.id_cate_news,0);
    this.props.setLoading(true);
    
  }
  onChange=(page)=>{
    this.props.getListMP(this.props.params.id_cate_news,page-1);
    this.props.setLoading(true);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_cate_news!==nextProps.params.id_cate_news){
      this.props.getListMP(nextProps.params.id_cate_news,0);
      this.props.setLoading(true);
    }
    // if(this.props.delSuccess!==nextProps.delSuccess && nextProps.delSuccess===true){
    //   if(this.props.listNews && (this.props.listNews.size>0||this.props.listNews.length>0)){
    //     this.props.getListMP(this.props.params.id_cate_news,this.props.curentPage);
    //     this.props.setLoading(true);
    //   }else{
    //     if(this.props.curentPage>0){
    //       this.props.getListMP(this.props.params.id_cate_news,this.props.curentPage-1);
    //       this.props.setLoading(true);
    //     }
    //   }
    // }
  }
  render() {
    let modalAdd = null;
      modalAdd = (
        <ModalAddNewsMp addNewsMP={this.props.addNewsMP} modalAddNews={this.state.modalAddNews} setLoading={this.props.setLoading}
         handleCloseModalAdd={this.handleCloseModalAdd} errorCode={this.props.errorCode} idCate={this.props.params.id_cate_news}/>
      )
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
      <div style={styles.wrapcontent}>
        {modalAdd}
        <div style={styles.inlineWrapContent}>
          <div style={styles.header}>
            <div style={{flex: 1}}>Nội dung</div>
            <div>
              <Button onClick={this.addNewsHandle} type="primary" icon="plus" size='large' >Thêm mới</Button>
            </div>
          </div>
          <div style={styles.content}>
            <ClistMarketPrice listNews={this.props.listNews} setLoading={this.props.setLoading} deleteNewsMP={this.props.deleteNewsMP}/>
          </div>
          {page}
        </div>
      </div>
    );
  }
}

ListMarketPrice.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listNews: selectGetListMP(),
  totalItem: selectTotalItemListMP(),
  curentPage: selectPageGetListMP(),
  delSuccess: selectStateDelMP(),
  errorCode: selectErrorCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    setLoading: (loading) => dispatch(setLoading(loading)),
    getListMP: (id,page)=> dispatch(getListMP(id,page)),
    deleteNewsMP: (id) => dispatch(deleteNewsMP(id)),
    addNewsMP: (idCate,name,price,unit,place,note) => dispatch(addNewsMP(idCate,name,price,unit,place,note)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMarketPrice);
