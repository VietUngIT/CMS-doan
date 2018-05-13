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
  

render() {
    return (
      <div>
        Nguyễn Phương Anh
      </div>
    )
}
}
