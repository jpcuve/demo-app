import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RouteComponentProps } from 'react-router';
import client from './remote';
import { createStore, Reducer, Action, combineReducers } from 'redux';
import { Provider } from 'react-redux';

export interface PageProps extends RouteComponentProps {}

export interface ApplicationState {
  counter: number,
}

client.get('/master/all-currency-groups').then((res: any) => console.log(JSON.stringify(res)))
const rootReducer: Reducer<ApplicationState, Action> = (state: ApplicationState = {counter: 0}, action: Action) => {
  console.log(`User reducer is called, state: ${JSON.stringify(state)} action: ${JSON.stringify(action)}`)
  switch(action.type){
    case 'increment-counter':
      return {...state, counter: state.counter + 1}
  }
  return state
}
const store = createStore(rootReducer)
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
