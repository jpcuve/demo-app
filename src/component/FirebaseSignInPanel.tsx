import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'


const uiConfig = {
  signInFlow: 'popup',
  signinOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Whether the display name should be displayed in the Sign Up page.
      requireDisplayName: true
    },
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // Invisible reCAPTCHA with image challenge and bottom left badge.
      recaptchaParameters: {
        type: 'image',
        size: 'invisible',
        badge: 'bottomleft'
      }
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
      return false  // no redirect
    },
    signInFailure: async (error: any) => {
      console.log(`Error: ${error.code} ${JSON.stringify(error.credential)}`)
    }
  },
}

const FirebaseSignInPanel: React.FC = () => {
  const [signedIn, setSignedIn] = React.useState<boolean>(false)
  React.useEffect(() => {
    console.log('Registering authentication state listener')
    const unregister = firebase.auth().onAuthStateChanged((user: any) => {
      console.log(`Authentication state changed: ${JSON.stringify(user)}`)
      setSignedIn(!!user)
      // user is authenticated here and can be safely transmitted to background server
      // to get a token in return
    })
    return () => unregister()
  }, [])
  return (
    <>
      {!signedIn && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>}
      {signedIn && <button onClick={() => firebase.auth().signOut()}>Sign-out</button>}
      <div>{signedIn.toString()}</div>
    </>
  )
}

export default FirebaseSignInPanel
