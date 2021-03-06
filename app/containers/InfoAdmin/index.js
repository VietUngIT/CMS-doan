/*
 *
 * InfoAdmin
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import InfoAdminPage from 'components/InfoAdminPage';
import styles from './styles';
import {
  getinfoAdmin,
  changeNameAdmin,
  changePhoneAdmin,
  changeAddressAdmin,
  changeAvatarAdmin,
  submitChangeAvatarAdmin,
  changePassAdmin,
} from './actions';
import {
  selectUser,
  selectNewPhone,
  selectAddress,
  selectAvatar,
  selectLoading,
} from './selectors';
export class InfoAdmin extends React.Component { 

  componentWillMount(){
    this.props.getinfoAdmin();
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
    let content = false;
    if(this.props.user){
      content = (<InfoAdminPage user={this.props.user} changeNameAdmin={this.props.changeNameAdmin} changePhoneAdmin={this.props.changePhoneAdmin}
        changeAddressAdmin={this.props.changeAddressAdmin} changeAvatarAdmin={this.props.changeAvatarAdmin}
        submitChangeAvatarAdmin={this.props.submitChangeAvatarAdmin} avatar={this.props.avatar}
        changePassAdmin={this.props.changePassAdmin}/>)
    }
    return (
      
      <div style={{width: "100%",height:"100%",paddingTop:"5%"}}>
        <Helmet
          title="Thông tin cá nhân"
          meta={[
            { name: 'description', content: 'Description of InfoAdmin' },
          ]}
        />
        {loading}
        {content}
      </div>
    );
  }
}

InfoAdmin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  newPhone: selectNewPhone(),
  address: selectAddress(),
  avatar: selectAvatar(),
  loading: selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getinfoAdmin: ()=> dispatch(getinfoAdmin()),
    changeNameAdmin: (name)=> dispatch(changeNameAdmin(name)),
    changePhoneAdmin: (newPhone)=>dispatch(changePhoneAdmin(newPhone)),
    changeAddressAdmin: (address)=>dispatch(changeAddressAdmin(address)),
    changeAvatarAdmin: (avatar)=>dispatch(changeAvatarAdmin(avatar)),
    submitChangeAvatarAdmin: ()=>dispatch(submitChangeAvatarAdmin()),
    changePassAdmin: (oldPass,newPass)=>dispatch(changePassAdmin(oldPass,newPass)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoAdmin);
