/*
 *
 * ListExpert
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import styles from './styles';
import ClistFieldExpert from 'components/CUserManager/CExpert/ClistFieldExpert'
import {
  getListField,
  addField,
  delField,
 } from './actions';
 import {
  selectListField,
  selectErrorCode,
  selectLoading,
 } from './selectors';

export class ListExpert extends React.Component {
  componentWillMount(){
    this.props.getListField();
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
          title="chuyên gia"
          meta={[
            { name: 'description', content: 'Description of CateMarketPrice' },
          ]}
        />
        {loading}
        <Row>
          <Col span={10}>
            <div style={styles.wrapcontentlistnews}>
              <div style={styles.inlineWrapContentlistnews}>
                <div style={styles.header}>Danh mục lĩnh vực</div>
                <div style={styles.content}>
                  <ClistFieldExpert listField={this.props.listField} addField={this.props.addField} 
                    delField={this.props.delField}/>
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

ListExpert.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listField: selectListField(),
  errorCode: selectErrorCode(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListField: () => dispatch(getListField()),
    addField: (name) => dispatch(addField(name)),
    delField: (id) => dispatch(delField(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExpert);
