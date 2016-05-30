import firebase from 'firebase';

try {
  var config = {
      apiKey: "AIzaSyBvdh6DJBapkmWd3CyU2f7dhMrrp6Ain9w",
      authDomain: "john-todo-app.firebaseapp.com",
      databaseURL: "https://john-todo-app.firebaseio.com",
      storageBucket: "john-todo-app.appspot.com",
    };

    firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();

export default firebase;
