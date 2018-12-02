import app from 'firebase/app';
import 'firebase/auth';

import * as APIKEYS from '../../constants/apikeys';

// rgo removed the apikeys :)

const config = {
    apiKey:APIKEYS.apikey,
    authDomain:APIKEYS.authDomain,
    databaseURL:APIKEYS.databaseURL,
    projectId:APIKEYS.projectId,
    storageBucket:APIKEYS.storageBucket,
    messagingSenderId:APIKEYS.messagingSenderId
};

class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
    }
   
    
  // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
      
}
export default Firebase;