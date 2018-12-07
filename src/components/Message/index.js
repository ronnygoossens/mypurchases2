// Message.js

import React, {Component} from 'react';

class Message extends Component {

  render(){
    return (
      <div> {this.props.message} - {this.props.thekey}</div>
          )
  }
}
export default Message