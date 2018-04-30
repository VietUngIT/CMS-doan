/**
*
* LoginPage
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Input,Button,Icon,Row,Col,Checkbox,message,Form } from 'antd';
import { Link } from 'react-router';
import {
  loginPhone,
  loginError,
} from 'containers/Login/actions';
const Input_ = styled.input`
  height : 35px;
  flex : 1;
  fontSize : 16px;
  paddingLeft:5px;
  &:focus {
    outline: none;
    color :#5c4646 ;
  },
`;

//var phone = null;
//var password = null;
//var textError = null;
class LoginPage extends React.Component { 
  loginPhone=()=>{
    if(this.refs.phone.props.value!=null && this.refs.password.props.value != null &&
      this.refs.phone.props.value.trim() !="" && this.refs.password.props.value.trim() !=""){
      this.props.loginPhone(this.refs.phone.props.value.trim(),this.refs.password.props.value.trim());
    }else{
      this.props.loginError('Không được để trống !')
      message.error("Không được để trống !")
    }
  };
  onChangeRemember=(e)=>{
    this.props.changeRemember(e.target.checked);
  }
 
  render() {
    var userInfo;
    if(JSON.parse(localStorage.getItem('userInfo'))){
      userInfo=JSON.parse(localStorage.getItem('userInfo'));
    }

    

    let phone="null";
    if(!this.props.phone){
      phone="";
    } else {
      phone = this.props.phone;
    }
    let password="null";
    if(!this.props.password){
      password="";
    } else {
      password = this.props.password;
    }
    return (
      <div style={styles.page}>
          <img src={require('./dark-material-bg.jpg')} style={styles.imageBG}/>
          <div style={styles.page}>
            <div style={styles.content}>
              <div style={styles.formLogin}>
                <div style={{textAlign: 'center',padding: '20px 20px 0px 20px'}}>
                  <img src={require('./fuse.svg')} style={styles.logo}/>
                </div>
                <div style={{textAlign: "center"}}>
                  <span style={{fontSize:30,fontWeight:"bold"}}>ADMIN LOGIN</span>
                </div>
                <div style={styles.wrapInput}>
                  <div style={styles.wrapIcon}>
                    <Icon type="user" style={styles.icon} />
                  </div>
                  <Input_ value={phone} placeholder="Phone"  ref="phone" autoComplete = "off" 
                      onChange={(e)=>this.props.changePhone(e.target.value)}/>
                </div>
                <div style={styles.wrapInput}>
                  <div style={styles.wrapIcon}>
                    <Icon type="lock" style={styles.icon} />
                  </div>
                  <Input_ value={password} placeholder="Password" type="password"  ref="password" autoComplete = "off" 
                          onChange={(e)=>this.props.changePassword(e.target.value)}/>
                </div>
                <div style={{margin: '10px 20px'}}><Checkbox onChange={this.onChangeRemember}>Remember password</Checkbox></div>
                  <div style={{textAlign: 'center'}}>
                    <Button style={styles.btnLogin} onClick={this.loginPhone} onKeyPress={this.handleKeyPress}> LOGIN </Button>
                  </div>
                
              </div>
            </div>
          </div>
      </div>
    );
  }
}

LoginPage.propTypes = {

};
const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    loginPhone: (phone,password)=> dispatch(loginPhone(phone,password)),
    loginError: (error)=> dispatch(loginError(error)),
    
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
