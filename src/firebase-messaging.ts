import firebase from 'firebase'

const messaging = firebase.messaging()
console.log(`Vapid key: ${process.env.REACT_APP_FIREBASE_VAPID_KEY}`)
messaging.usePublicVapidKey(process.env.REACT_APP_FIREBASE_VAPID_KEY || '')

export default messaging