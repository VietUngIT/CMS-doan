/*
 *
 * CateMarketInfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import styles from './styles';
import CcateMarketInfo from 'components/CNewsManage_V2/CMarketInfo/CcateMarketInfo'
import {
  getListCateNewsMK,
  addCateNewsMK,
  delCateNewsMK,
} from './actions';
import {
  selectListCateMK,
  selectLoading,
} from './selectors';

export class CateMarketInfo extends React.Component {
  componentWillMount(){
    this.props.getListCateNewsMK();
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
      <div style={styles.wrapcontent}>
      <Helmet
          title="tin thị trường"
          meta={[
            { name: 'description', content: 'Description of ListMarketInfo' },
          ]}
        />
        {loading}
        <div style={styles.inlineWrapContent}>
          <div style={styles.header}>Danh mục tin tức thị trường</div>
          <div style={styles.content}>
            <CcateMarketInfo listCate={this.props.listCate} addCateNewsMK={this.props.addCateNewsMK} 
              delCateNewsMK={this.props.delCateNewsMK}/>
          </div>
        </div>
      </div>
    );
  }
}

CateMarketInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  listCate: selectListCateMK(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListCateNewsMK: ()=> dispatch(getListCateNewsMK()),
    addCateNewsMK: (nameCate)=> dispatch(addCateNewsMK(nameCate)),
    delCateNewsMK: (id)=> dispatch(delCateNewsMK(id)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateMarketInfo);
