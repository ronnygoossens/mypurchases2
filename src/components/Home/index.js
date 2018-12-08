import Firebase from 'firebase';
import trim from 'trim';
import _ from 'lodash';
import Message from '../Message';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { compose } from 'recompose';

const Home = () => (
  <div>
    <h1>Home</h1>
    <StoreFirstData db={Firebase} />
    <hr />
    <ListFirebase db={Firebase} />

  </div>
);

const INITIAL_STATE = {
  message:''
  };
//, error: null

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
              <Message thekey={message.key} message = {message.message} />
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
  
class StoreFirstData extends Component {
  constructor(props) {
    //Firebase.database();
    super(props);
    this.state = { ...INITIAL_STATE };
    this.storeData=this.storeData.bind(this);
    this.onKeyup=this.onKeyup.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    
  };

  storeData = (e) => {
   
    e.preventDefault();
    let dbCon = Firebase.database().ref('/messages');
    dbCon.push({
      message: trim(this.state.message)
     })
     .then(authUser => {
      this.setState({ ...INITIAL_STATE });
      //this.props.history.push(ROUTES.HOME);
      alert("dit is gelukt");
    })
    .catch(error => {
 //     console.log("failed to post...");
   //   alert("Error db");
      this.setState({ error });
    });
//    e.preventDefault();
  };

  onSubmit(e) {
   
    this.storeData(e);
  };

    onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  onKeyup(e){
    e.preventDefault();
    if(e.keyCode === 13 && trim(e.target.value) !== '')
    {   this.storeData(e)}
    }

      render() {
    
    /*    const {
      username,
      street,
      postalcode,
      error,
      message
   } = this.state;
*/
    const isInvalid =
       this.state.username === '';

    return (
      <form onSubmit={this.onSubmit}>
           <textarea
            className="textarea"
            name="message"
            placeholder="Type a message"
            cols="100"
            onChange={this.onChange}
            onKeyUp={this.onKeyup}
            value={this.state.message}>
          </textarea>
         <button disabled={isInvalid} type="submit">
          Push data
        </button>

        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }
}

const StoreData = compose(withRouter,   withFirebase)(StoreFirstData);

export default Home;

export { StoreData };