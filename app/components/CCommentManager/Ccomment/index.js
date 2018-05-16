/**
*
* Ccomment
*
*/

import React from 'react';
import styles from './styles'
import { Button, Radio, Icon, Tooltip, Popconfirm } from 'antd';
import CitemComment from "../CitemComment";

class Ccomment extends React.Component {

  render() {

    let listCommentShow = false;

    listCommentShow = (
      <CitemComment/>
    )

    return (
      <div>
        <div style={styles.headerComment}>
          Danh sách bình luận
        </div>
        <div style={styles.wrapComment}>
          {listCommentShow}
        </div>
      </div>
    );
  }
}

Ccomment.propTypes = {

};

export default Ccomment;
