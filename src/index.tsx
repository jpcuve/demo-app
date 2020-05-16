import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from './store'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyCUhma0HQvWylRwZhfDhsB92kebrKHD7OA",
  authDomain: "fir-54071.firebaseapp.com",
  databaseURL: "https://fir-54071.firebaseio.com",
  projectId: "fir-54071",
  storageBucket: "fir-54071.appspot.com",
  messagingSenderId: "784351879169",
  appId: "1:784351879169:web:230c9da7ef26fb7e88a000",
  measurementId: "G-6T38HP0TYC",
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
