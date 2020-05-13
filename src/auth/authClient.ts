import firebase from 'firebase';

const firebaseConfig = {
  // todo: add in fb creds here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const authClient = firebase.auth();
