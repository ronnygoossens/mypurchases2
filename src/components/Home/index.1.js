import Firebase from 'firebase';
import trim from 'trim';

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { compose } from 'recompose';

const Home = () => (
  <div>
    <h1>Home</h1>
    <GetStoreFirstData db={Firebase} />
  </div>
);

const INITIAL_STATE = {
  username: '',
  address: '',
  street: '',
  city: '',
  message:'',
  error: null
  };

class GetStoreFirstData extends Component {
  constructor(props) {
    //Firebase.database();
    super(props);
    this.state = { ...INITIAL_STATE };
  };

  onSubmit(e) {
    if(e.keyCode === 13 && trim(e.target.value) !== ''){
      e.preventDefault();
      let dbCon = Firebase.database().ref('/messages');
      dbCon.push({
        message: trim(e.target.value)
      });
      this.setState({
        message: ''
      });
    }
  }
  
  /*{
    const { email, passwordOne } = this.state;
//removed username in line above as param / rgo on 23/11/18
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
*/
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onKeyup(e){
    if(e.keyCode === 13 && trim(e.target.value) !== ''){
      e.preventDefault();
      let dbCon = Firebase.database().ref('/messages');
      dbCon.push({
        message: trim(e.target.value)
      });
      this.setState({
        message: ''
      });
    }
    e.preventDefault();
    }
  render() {
    const {
      username,
      street,
      postalcode,
      error,
      message
   } = this.state;

    const isInvalid =
       username === '';

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

        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="street"
          value={street}
          onChange={this.onChange}
          type="text"
          placeholder="Street"
        />
        <input
          name="postalcode"
          value={postalcode}
          onChange={this.onChange}
          type="text"
          placeholder="Postalcode"
        />
        <button disabled={isInvalid} type="submit">
          Push data
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const StoreData = compose(withRouter,   withFirebase)(GetStoreFirstData);


export default Home;

export { StoreData };