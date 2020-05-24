import React from 'react'
import { RouteComponentProps } from 'react-router'
import Outline from './PageTemplate'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
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
        return true  // false: no redirect
      },
      signInFailure: async (error: any) => {
        console.log(`Error: ${error.code} ${JSON.stringify(error.credential)}`)
      }
    },
  }
  
const AuthPage: React.FC<RouteComponentProps> = props => {
    return (
        <Outline {...props}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </Outline>
    )
}

export default AuthPage