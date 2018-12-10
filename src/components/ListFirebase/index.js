import _ from 'lodash';
import Message from '../Message';

import React, { Component } from 'react';

class ListFirebase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: []
      };
      
      let app = this.props.db.database().ref('messages');
      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });

      //this.state = { ...INITIAL_STATE };
      this.getData=this.getData.bind(this);
    };

    getData(values){
    
      let messagesVal = values;
      let messages = _(messagesVal)
                        .keys()
                        .map(messageKey => {
                            let cloned = _.clone(messagesVal[messageKey]);
                            cloned.key = messageKey;
                            return cloned;
                        })
                        .value();
        this.setState({
          messages: messages
        });
    }

    render() {
      
      let messageNodes = this.state.messages.map((message) => {
      return (
          <div key={message.key} className="card">
            <div className="card-content">
              <Message thekey={message.key} message = {message.message} db={this.props.db}/>
            </div>
          </div>
      )
    });
    return (
      <div>
        {messageNodes}
      </div>
    );
  }
}

export default ListFirebase;
  