// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCUhma0HQvWylRwZhfDhsB92kebrKHD7OA',
  authDomain: 'fir-54071.firebaseapp.com',
  databaseURL: 'https://fir-54071.firebaseio.com',
  projectId: 'fir-54071',
  storageBucket: 'fir-54071.appspot.com',
  messagingSenderId: '784351879169',
  appId: '1:784351879169:web:230c9da7ef26fb7e88a000',
  measurementId: 'BIlIsad7yLIX5u3YSGLbwTF2XV5PZJhqGIGEZjveDwSUL2Ppui3AiaNqYpjpyU8JRY3xTp0Ar4G1v5Ykz4uXRJ8',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler((payload) => {
  console.log(`Message received in background, payload: ${JSON.stringify(payload)}`)
  const notificationTitle = 'Background message title'
  const notificationOptions = {
    body: 'Background message body',
    icon: '/firebase-logo.png'
  }
  return self.registration.showNotification(notificationTitle, notificationOptions)
})