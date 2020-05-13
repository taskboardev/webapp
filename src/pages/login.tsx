import React from 'react';
import firebase from 'firebase';
import FirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { authClient } from '../auth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

export default function Login() {
  return (
    <div>
      <FirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={authClient}
      />
    </div>
  );
}
