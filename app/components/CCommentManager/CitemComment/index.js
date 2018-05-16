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
    console.log("Đồng ý")
  }
  cancel=()=>{
    console.log("Hủy")
  }
  render() {
    let itemComment = false;

    itemComment = (
      <div style={styles.itemComment}>
            <div>
              <img src={require('containers/App/maxresdefault.jpg')} id="imgstore" width='65px' height='65px' />
            </div>
            <div style={styles.contentComment}>
              <div style={styles.warpUserInfoComment}>
                <div style={styles.userInfoComment}>
                  <div style={styles.avatarComment}>Đinh Viết Ưng</div>
                  <div style={styles.dateComment}>16/05/2018</div>
                </div>
                <div style={styles.wrapBtnClose}>
                  <Popconfirm title="Bạn chắc chắn muốn xóa bình luận này?" onConfirm={this.confirm} onCancel={this.cancel} okText="Đồng ý" cancelText="Hủy">
                    <Tooltip placement="topRight" title="Xóa bình luận">
                      <Button style={styles.btnClose} type="danger" shape="circle" icon="close" size="small" />
                    </Tooltip>
                  </Popconfirm>
                </div>
              </div>
              <div>Đây không phải lần đầu xuất hiện hướng suy nghĩ như của C.N. Là một game thủ yêu thích những dòng game chiến thuật, hẳn bạn đọc sẽ hiểu. Đôi khi trong quá trình trải nghiệm, có những chi tiết mà chúng ta rất muốn thay đổi đi ít nhiều. Ví dụ như chỉ số cơ bản, hiệu ứng kỹ năng hay thậm chí là cả tạo hình nhân vật.</div>
            </div>
          </div>
    )
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
