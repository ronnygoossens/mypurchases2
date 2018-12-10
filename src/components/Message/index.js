import React, {Component} from 'react';


class Message extends Component {
  constructor(props) {
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
  };

onSubmit = () => {
this.props.db.database().ref('messages/'+this.props.thekey).remove();

  }
  ;
  render(){
    return (
      <div>
        <div>
        {this.props.message} - {this.props.thekey}
        
        <button type="button" onClick={this.onSubmit}>
          Delete 
  </button>
        </div>
      </div>
        )
  }
}
export default Message