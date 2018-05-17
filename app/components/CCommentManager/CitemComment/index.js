/**
*
* CitemComment
*
*/

import React from 'react';
import styles from "./styles";
import { Button, Radio, Icon, Tooltip, Popconfirm } from 'antd';


class CitemComment extends React.Component {
  confirm=()=>{
    if(this.props.comment){
      this.props.delComment(this.props.comment._id,this.props.idNews)
    }
  }
  cancel=()=>{
    console.log("Hủy")
  }
  convertTime (time){
    var d = new Date(time),
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),
    dd = ('0' + d.getDate()).slice(-2),
    hh = ('0' + d.getHours()).slice(-2),
    min = ('0' + d.getMinutes()).slice(-2),

    result, time;
    time = hh + ':' + min;
    const date =   dd+ '/' + mm + '/'+ yyyy ;
    result =date+" "+ time ;
    return result;
  }
  render() {
    let itemComment = false;
    let avatar = require('containers/App/maxresdefault.jpg');
    let name = false;
    let content = false;
    let date = false;
    if(this.props.comment){
      if(this.props.comment.avatar!==null){
        let index = this.props.comment.avatar.indexOf("upload/")+7;
        avatar = this.props.comment.avatar.substring(0,index)+"q_20/"+this.props.comment.avatar.substring(index);
      }
      name = this.props.comment.name;
      content = this.props.comment.content;
      date = this.convertTime(this.props.comment.timeCreate)
      itemComment = (
        <div style={styles.itemComment}>
          <div>
            <img src={avatar} id="imgstore" width='50px' height='50px' />
          </div>
          <div style={styles.contentComment}>
            <div style={styles.warpUserInfoComment}>
              <div style={styles.userInfoComment}>
                <div style={styles.avatarComment}>{name}</div>
                <div style={styles.dateComment}>{date}</div>
              </div>
              <div style={styles.wrapBtnClose}>
                <Popconfirm title="Bạn chắc chắn muốn xóa bình luận này?" onConfirm={this.confirm} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
                  <Tooltip placement="topRight" title="Xóa bình luận">
                    <Button style={styles.btnClose} type="danger" shape="circle" icon="close" size="small" />
                  </Tooltip>
                </Popconfirm>
              </div>
            </div>
            <div>{content}</div>
          </div>
        </div>
      )
    }
    
    return (
      <div>
        {itemComment}
      </div>
    );
  }
}

CitemComment.propTypes = {

};

export default CitemComment;
