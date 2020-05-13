import firebase from 'firebase';

const firebaseConfig = require(__dirname + '/../../' + process.env.FIREBASE_CONFIG_PATH);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const authClient = firebase.auth();
