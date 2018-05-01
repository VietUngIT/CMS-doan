/*
 *
 * InFoListExpert
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import ClistExpert from 'components/CUserManager/CExpert/ClistExpert'
import ModalAddExpert from 'components/CUserManager/CExpert/ModalAddExpert'
import styles from './styles';
import {
  getListExpert,
  addExpert,
} from './actions';
import {
  getListField,
  setLoading,
} from '../ListExpert/actions';
import {
  selectListExpert,
  selectPageListExpert,
  selectLoading,
  selectTotalItemListExpert,
  selectErrorCode,
} from './selectors';

import {
  selectListField,
} from '../ListExpert/selectors'


export class InFoListExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddExpert: false,
    }
  }
  handleShowModalAdd=()=>{
    this.setState({
      modalAddExpert: true,
    });
  }
  handleCloseModalAdd=()=>{
    this.setState({
      modalAddExpert: false,
    });
  }
  addExpertHandle=()=>{
    this.handleShowModalAdd();
  }
  componentWillMount(){
    this.props.getListExpert(this.props.params.id_field,0);
    if(!(this.props.listField && (this.props.listField.size>0 || this.props.listField.length>0))){
      this.props.getListField();
    }
  }
  onChange=(page)=>{
    this.props.getListExpert(this.props.params.id_field,page-1);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id_field!==nextProps.params.id_field){
      this.props.getListExpert(nextProps.params.id_field,0);
    }
    if((this.props.isLoading !== nextProps.isLoading) && nextProps.isLoading){
      this.props.setLoading(true);
    } else if((this.props.isLoading !== nextProps.isLoading) && !nextProps.isLoading){
      this.props.setLoading(false);
    }
  }

  render() {
    let modalAdd = null;
    modalAdd = (
      <ModalAddExpert modalAddExpert={this.state.modalAddExpert} handleCloseModalAdd={this.handleCloseModalAdd}
        listField={this.props.listField} addExpert={this.props.addExpert} idFieldCurrent={this.props.params.id_field}
        errorCode={this.props.errorCode}/>
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
        
        <div style={styles.wrapContent}>
          <Helmet
            title="Chuyên gia"
            meta={[
              { name: 'description', content: 'Description of InFoListExpert' },
            ]}
          />
          {modalAdd}
          <div style={styles.inlineWrapContent}>
            <div style={{display: 'flex', flexDirection: 'collumn'}}>
              <div style={styles.header}>Danh sách chuyên gia</div>
              <div style={{flex: 2,minWidth:96,textAlign: 'center',paddingTop: 8,backgroundColor: '#a2a2a2',}}>
                <Button onClick={this.addExpertHandle} type="primary" icon="plus-square-o" >Thêm mới</Button>
              </div>
            </div>
            <ClistExpert listExpert={this.props.listExpert}/>
            {page}
          </div>
        </div>
    );
  }
}

InFoListExpert.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listField: selectListField(),
  listExpert: selectListExpert(),
  totalItem: selectTotalItemListExpert(),
  curentPage: selectPageListExpert(),
  isLoading: selectLoading(),
  errorCode: selectErrorCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListField: () => dispatch(getListField()),
    setLoading: (loading) => dispatch(setLoading(loading)),
    getListExpert: (id,page) => dispatch(getListExpert(id,page)),
    addExpert: (idfieldcurrent,name,phone,desc,email,address,workplace,idfield,lat,long,tags,degree) => dispatch(addExpert(idfieldcurrent,name,phone,desc,email,address,workplace,idfield,lat,long,tags,degree)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InFoListExpert);
