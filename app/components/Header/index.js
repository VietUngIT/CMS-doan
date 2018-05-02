/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
import styles from './styles';
import {Icon} from 'antd';


class Header extends React.Component {
  toggleNavigation=()=>{
    this.props.toggleNavigation();
  }

  render() {
    return (
      <div style={styles.header}>
        <div style={styles.logo}>Admin manager</div>
        <div style={styles.nav}>
          <Icon onClick={this.toggleNavigation} type={this.props.collapse?"menu-unfold":"menu-fold"} style={styles.toggle}/>
        </div>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
