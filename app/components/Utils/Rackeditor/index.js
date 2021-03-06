/**
*
* Rackeditor
*
*/

import React from 'react';
// import styled from 'styled-components';


class Rackeditor extends React.Component {
  constructor(props) {
    super(props);
    this.elementName = "editor_" + this.props.id;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    return (
      <textarea name={this.elementName} defaultValue={this.props.value}></textarea>
    )
  }
  componentWillReceiveProps(nextProps){
    // console.log("componentWillReceiveProps-CK");
    // console.log("componentWillReceiveProps-CK: "+nextProps.initValue)+ "----"+this.props.initValue;
    // if(this.props.initValue!==nextProps.initValue && nextProps.value){
    //   // console.log("componentWillReceiveProps-CK: "+nextProps.initValue);
    //   CKEDITOR.instances[this.elementName].setData(nextProps.initValue)
    // }
    // if(this.props.value!==nextProps.value){
    //   // console.log("componentWillReceiveProps-CK--: "+nextProps.value);
    //   CKEDITOR.instances[this.elementName].setData(nextProps.value)
    // }
    if(this.props.initValue !== nextProps.initValue && nextProps.initValue){
      CKEDITOR.instances[this.elementName].setData(nextProps.value)
    }
  }
  // initValue(){
  //   CKEDITOR.instances[this.elementName].setData(nextProps.initValue)
  // }

  componentDidMount() {
    let configuration = {
      toolbar: "Basic"
    };
    CKEDITOR.replace(this.elementName, configuration);
    CKEDITOR.instances[this.elementName].on("change", function () {
      let data = CKEDITOR.instances[this.elementName].getData();
        this.props.onChange(data);
      
    }.bind(this));
  }
}

Rackeditor.propTypes = {

};

export default Rackeditor;
