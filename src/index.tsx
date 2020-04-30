import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RouteComponentProps } from 'react-router';
import client from './remote';
import { createStore, Reducer, Action } from 'redux';
import { Provider } from 'react-redux';

export interface PageProps extends RouteComponentProps {}

client.get('/master/all-currency-groups').then((res: any) => console.log(JSON.stringify(res)))
const reducer: Reducer<any, Action> = (state, action: Action) => {
  
}
const store = createStore(reducer)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
