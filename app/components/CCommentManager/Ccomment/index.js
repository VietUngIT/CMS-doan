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

  loadMoreComment=()=>{
    if(this.props.idNews){
      this.props.getCommentNews(this.props.idNews,this.props.pageComment+1)
    }
  }

  render() {

    let listCommentShow = false;
    let loadmore = false;
    if(this.props.listComment && (this.props.listComment.size>0 || this.props.listComment.length>0)){
      listCommentShow = this.props.listComment.map((item,index)=>{
        return (<CitemComment key={index} comment={item} delComment={this.props.delComment} idNews={this.props.idNews}/>);
      });
      let currentItem = 0;
      if(this.props.listComment.size>0){
        currentItem = this.props.listComment.size;
      }else if(this.props.listComment.length>0){
        currentItem = this.props.listComment.length;
      }

      if(currentItem < this.props.totalComment){
        loadmore = (
          <div style={styles.loadMore}>
            <div onClick={this.loadMoreComment} style={{padding: 10,display: this.props.loadingComment?"none":'inline-block',textDecoration: 'underline',cursor: 'pointer',color: '#2196F3',fontWeight: 700,}}>Xem thêm</div>
            <div style={{display: this.props.loadingComment?'inline-block':"none",}}>
              <img src={require('containers/App/loadmore.gif')} />
            </div>
          </div>
        )
      }
    }
     

    return (
      <div>
        <div style={styles.headerComment}>
          Danh sách bình luận
        </div>
        <div style={styles.wrapComment}>
          {listCommentShow}
          {loadmore}
        </div>
      </div>
    );
  }
}

Ccomment.propTypes = {

};

export default Ccomment;
