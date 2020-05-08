import React from 'react'
declare const gapi: any

const SocialSignInPanel: React.FC<{}> = () => {
  const onSignIn = async (googleUser: any) => {
    var profile = googleUser.getBasicProfile()
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  const signOut = async () => {
    const auth2 = gapi.auth2.getAuthInstance()
    console.log(`Auth 2: ${JSON.stringify(auth2)}`)
    await auth2.signOut()
    console.log('User signed out.')
  }
  React.useEffect(() => {
    console.log(`Setting-up google sign-in button`)
    const auth2 = gapi.auth2.getAuthInstance()
    console.log(`Auth 2: ${JSON.stringify(auth2)}`)
    gapi.signin2.render('google-sign-in', {
      'scope': 'profile email',
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSignIn,
      // 'onfailure': props.onFailure
    })
  }, [])
  return (
    <div>
      <div id="google-sign-in"></div>
      <button onClick={signOut}>Sign-out</button>
    </div>
  )
}

export default SocialSignInPanel