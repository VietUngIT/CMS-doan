/*
 *
 * CateAgriTech
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { Breadcrumb,Popconfirm } from 'antd';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import styles from './styles';
import CcateAgritech from 'components/CNewsManage_V2/CAgriTech/CcateAgritech'
import {
  getListCateAgriTech,
  addCateAgriTech,
  delCateAgriTech,
 } from './actions';
 import {
   selectListCateAgriTech,
   selectLoading,
 } from './selectors';

export class CateAgriTech extends React.Component {
  componentWillMount(){
    this.props.getListCateAgriTech();
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
    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="Tin tức kỹ thuật"
          meta={[
            { name: 'description', content: 'Description of CateAgriTech' },
          ]}
        />
        {loading}
        <Row>
          <Col span={12}>
            <div style={styles.wrapcontentlistnews}>
              <div style={styles.inlineWrapContentlistnews}>
                <div style={styles.header}>Danh mục tin tức</div>
                <CcateAgritech listCate={this.props.listCate} addCateAgriTech={this.props.addCateAgriTech} 
                  delCateAgriTech={this.props.delCateAgriTech}/>
              </div>
            </div>
          </Col>
          <Col span={12}>
            {React.Children.toArray(this.props.children)}
          </Col>
        </Row>
      </div>
    );
  }
}

CateAgriTech.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCate: selectListCateAgriTech(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateAgriTech: () => dispatch(getListCateAgriTech()),
    addCateAgriTech: (name) => dispatch(addCateAgriTech(name)),
    delCateAgriTech: (id) => dispatch(delCateAgriTech(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateAgriTech);
