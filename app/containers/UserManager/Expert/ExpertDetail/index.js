/*
 *
 * ExpertDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectExpertDetail from './selectors';
import { Row, Col, Button, Icon,Pagination } from 'antd';
import styles from './styles';

export class ExpertDetail extends React.Component {
  render() {

    return (
      <div style={{height: '100%'}}>
        <Helmet
          title="ExpertDetail"
          meta={[
            { name: 'description', content: 'Description of ExpertDetail' },
          ]}
        />
        <Row>
          <Col span={7}>
            <div style={styles.wrapAvatar}>
              <div style={{textAlign: 'center'}}>
                <img src={require('containers/App/fuse.svg')} id="imgstore" style={styles.avatar}/>
              </div>
              <div style={styles.labelName}>
                Nguyễn Phương Anh
              </div>
              <div style={{textAlign: 'center', marginTop: 10}}>
                <div style={{display: 'inline-block',padding: '2px 10px',background: '#45ff65',borderRadius: 40}}>online</div>
              </div>
              <div style={{display: 'flex',marginTop: 7}}>
                <div style={{flex: 1,minWidth: 40,textAlign: 'end',paddingRight: 5}}>3,5/5</div>
                <div style={{flex: 3}}>
                  <div style={{padding: '1px 5px 0px 0px'}}>
                    <div style={{height: 12,background: '#ffbf00',width: '70%',display: 'inline-block',borderTopLeftRadius: 7,borderBottomLeftRadius: 7}}></div>
                    <div style={{height: 12,background: '#c0c0c0',width: '30%',display: 'inline-block',borderTopRightRadius: 7,borderBottomRightRadius: 7}}></div>
                  </div>
                </div>
                <div style={{flex: 1,minWidth: 40,display: 'flex'}}>
                  <div style={{flex: 3,textAlign: 'end'}}>100</div>
                  <div style={{flex: 1,fontWeight: 600,paddingLeft: 2}}><Icon type="usergroup-add" /></div>
                </div>
              </div>
            </div>
            <div style={styles.wrapItem}>
              Thông tin cá nhân
            </div>
          </Col>
          <Col span={17}>
            <div >
              <div style={styles.wrapDetail}>
                <div style={styles.wrapTitle}>Thông tin chung</div>
                <div style={styles.wrapBody}>body</div>
              </div>
              <div style={styles.wrapDetail}>
                <div style={styles.wrapTitle}>Nghề nghiệp</div>
                <div style={styles.wrapBody}>body</div>
              </div>
              <div style={styles.wrapDetail}>
                <div style={styles.wrapTitle}>Từ khóa tìm kiếm</div>
                <div style={styles.wrapBody}>body</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ExpertDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ExpertDetail: makeSelectExpertDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDetail);
