import React from 'react';
import styled from 'styled-components';
import styles from './styles'

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 4px 0px;
  &:hover {
    transition-duration: 0.3s;
    color: #2979FF;
    text-decoration: underline;
  }
`;

// var questionDiv = null;
class CitemQa extends React.Component {
  componentDidMount(){
    if(this.props.data){
      // questionDiv = document.getElementById('questionDiv_'+this.props.index);
      // questionDiv.innerHTML = this.props.data.content;
    }
  }
  componentDidUpdate(){
    // if(questionDiv){
      if(this.props.data){
        // questionDiv = document.getElementById('questionDiv_'+this.props.index);
        // questionDiv.innerHTML = this.props.data.content;
      }
    // }
  }
  viewDetail=()=>{
    if(this.props.data){
      this.props.setQADetail(this.props.data);
    }
  }
  render() {
    let title = false;
    let question = false;
    if(this.props.data){
      title = this.props.data.title;
      question = this.props.data.content;
    }
    return (
      <div style={{padding: 10}}>
        <Title onClick={this.viewDetail}>{title}</Title>
        <div id={`questionDiv_${this.props.index}`} style={styles.wrapContentQuestion}>{question}</div>
      </div>
    );
  }
}

CitemQa.propTypes = {

};

export default CitemQa;
