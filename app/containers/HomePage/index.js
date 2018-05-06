/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CKEditor from "react-ckeditor-component";
import {Button,Modal,message} from 'antd'
import Rackeditor from 'components/Utils/Rackeditor';
var editor;
export default class HomePage extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
        content: "<p>I published a package on Npm for using CKEditor with React. It takes just 1 line of code to integrate in your project.</p><p>Github link -&nbsp;<a href='https://github.com/codeslayer1/react-ckeditor' rel='noreferrer'>https://github.com/codeslayer1/react-ckeditor</a>.</p><p>How to Use?</p>",
        content2: "<div>abc</div>"
    }
  }

  onChange=(content)=>{
    // var content = evt.editor_HP.getData();
    console.log(content);
    this.setState({ content:content,
      
     });
  }
  onChange1=(content)=>{
    // var content = evt.editor_HP.getData();
    console.log(content);
    this.setState({ content2:content,
      
     });
  }

onBlur(evt){
  console.log("onBlur event called with event info: ", evt);
}
componentDidMount(){
  let i =1;
  for(var instanceName in CKEDITOR.instances) {
    if(CKEDITOR.instances[instanceName].name.toUpperCase().indexOf("EDITOR")>-1){
      CKEDITOR.instances[instanceName].id = "Homepage_"+i;
      CKEDITOR.instances[instanceName].name = "Homepage_"+i;
      i++;
    }
  }
 
}

afterPaste(evt){
  console.log("afterPaste event called with event info: ", evt);
}
resetNews=()=>{
  console.log("resetNews")
  
  this.setState({
    content: "<p>Nguyễn Phương Anh 111</p>",
    content2: "<p>Nguyễn Phương Anh</p>"
  });
}

render() {
    return (
      <div>
         <Rackeditor id="HP1" value={this.state.content} onChange={this.onChange}/>
         <Rackeditor id="HP" value={this.state.content2} onChange={this.onChange1}/>
         <textarea name="html_link_content" id="content">TEXT</textarea>
         <Button type="danger" onClick={this.resetNews}>Reset</Button>
        </div>
    )
}
}
