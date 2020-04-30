import React from 'react'
import { User } from '../domain'
import client from '../remote'
declare const gapi: any

interface Props {
  scope: string,
  onSignIn: (user: User) => void,
  onFailure: (error: any) => void,
}

interface GoogleUser {
  getBasicProfile: () => BasicProfile,
  getAuthResponse: () => AuthResponse,
}

interface BasicProfile {
  getName: () => string,
  getImageUrl: () => string,
  getEmail: () => string,
}

interface AuthResponse {
  id_token: string,
}

const GoogleSignInButton: React.FC<Props> = props => {
  const [fetching, setFetching] = React.useState<boolean>(false)
  const handleSuccess = async (googleUser: GoogleUser) => {
    const token = googleUser.getAuthResponse().id_token
    console.log(`Google sign-in success: ${token}`)
    setFetching(true)
    try {
      const user: User = await client.post('/api/auth/google-sign-in', { 'token': token })
      props.onSignIn(user);
    } catch (e) {
      props.onFailure(e)
    }
  }
  React.useEffect(() => {
    console.log(`Setting-up google sign-in button`)
    gapi.signin2.render('google-sign-in', {
      'scope': props.scope,
      'width': 'auto',
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': handleSuccess,
      'onfailure': props.onFailure
    })
  }, [])
  return (
    <div id="google-sign-in">Google sign-in</div>
  )
}

export default GoogleSignInButton