'use strict';

import {utility, userLocalStorage, FB} from './GlobalObjects.js';
import '../Lib/firebase/FB-app.js';
import '../Lib/firebase/FB-auth.js';
import '../Lib/firebase/FB-database.js';

export default class FireBaseManager {
  constructor () {
    const firebaseInitObject = this.configFireBase ();
    this.db = firebaseInitObject.db;
    this.auth = firebaseInitObject.auth;
  }

  configFireBase () {
    const firebaseConfig = {
      apiKey: 'AIzaSyBW2InftQj45Gkd1ET6jWcu67fwhEwSh0k',
      authDomain: 'routelogin-4bfeb.firebaseapp.com',
      projectId: 'routelogin-4bfeb',
      storageBucket: 'routelogin-4bfeb.appspot.com',
      messagingSenderId: '438788483815',
      appId: '1:438788483815:web:c694c501b9f6a26ed8d042',
    };
    const firebaseApp = firebase.initializeApp (firebaseConfig);
    return {
      auth: firebaseApp.auth (),
      db: firebaseApp.database (),
    };
  }

  async writeUserData (userId, name, email, callback) {
    utility.appearIndicator(document.body);
    await this.db.ref ('users/' + userId).set ({
      username: name,
      email: email,
    });
    utility.hideIndicator();
    return callback ();
  }

  leaveFeedback (userId, feedback, callback) {
    utility.appearIndicator(document.body);
    this.getUserData (function (email, username) {
      FB.db.ref ('users/' + userId).set ({
        username: username,
        email: email,
        feedback: feedback
      });
      return callback ();
    })
    
    utility.hideIndicator();
  }

  async getUserData( data ) {
    utility.appearIndicator(document.body)
    const dbRef = this.db.ref();
    const userId = userLocalStorage.getUserData().uid
    if (userId == null) {
      userLocalStorage.attackingGuard()
    } else {
     await dbRef.child("users").child(userLocalStorage.getUserData().uid).get().then((snapshot) => {
        if (snapshot.exists()) {
            data(snapshot.val().email,snapshot.val().username)
            utility.hideIndicator()
        } else {
            userLocalStorage.attackingGuard()
        }
        }).catch((error) => {
         utility.hideIndicator()
        console.log(error);
        });
    }
  }

  async allFeedbacks( data ) {
    const dbRef = this.db.ref();
    const userId = userLocalStorage.getUserData().uid;
    const arr = [];
    if (userId == null) {
      userLocalStorage.attackingGuard();
    } else {
     await dbRef.child("users").get().then((snapshot) => {
        if (snapshot.exists()) {
            for (const prop in snapshot.val()) {
                arr.push(snapshot.val()[prop]);
            }
            data(arr);
        } else {

        }
        }).catch((error) => {
          console.log(error);
        });
    }
  }

  async createUserFB (user, getInputs) {
    utility.appearIndicator(document.body)
    firebase
      .auth ()
      .createUserWithEmailAndPassword (user.email, user.password)
      .then (userCredential => {
        let FBuser = userCredential.user;
        this.writeUserData (FBuser.uid, user.name, FBuser.email, function () {
          // Localstorage User
          var userLS = {uid: FBuser.uid,email:FBuser.email,username: user.name}
          userLocalStorage.setUserData (userLS);
          userLocalStorage.userLoggedIn();
          utility.hideIndicator()
        });
      })
      .catch (error => {
        utility.hideIndicator()
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          utility.getErrVisual (getInputs.email, 'DB: email Used Before');
        } else {
          utility.getErrVisual (getInputs.email, errorMessage);
        }
        console.log (errorCode);
      });
  }

  loginUserFB (user, getInputs) {
    utility.appearIndicator(document.body)
    firebase
      .auth ()
      .signInWithEmailAndPassword (user.email, user.password)
      .then (userCredential => {
        let user = userCredential.user;
        userLocalStorage.setUserData (user);
        userLocalStorage.userLoggedIn ();
        utility.hideIndicator()
      })
      .catch (error => {
        utility.hideIndicator()
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/user-not-found') {
          utility.getErrVisual (getInputs.email, 'DB: Email not found in DB');
        } else if (errorCode == 'auth/wrong-password') {
          utility.getErrVisual (
            getInputs.password,
            'DB: Email founded in our DB but password is wrong'
          );
        } else {
          utility.getErrVisual (getInputs.email, errorMessage);
        }
      });
  }
}
