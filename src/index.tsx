import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { RouteComponentProps } from 'react-router';
import client from './remote';
import { createStore, Reducer, Action, combineReducers, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { User, defaultUser } from './domain';

export interface PageProps extends RouteComponentProps {}

export interface ApplicationState {
  counter: number,
  user: User,
}

const defaultApplicationState: ApplicationState = {
  counter: 0,
  user: defaultUser,
}

client.get('/master/all-currency-groups').then((res: any) => console.log(JSON.stringify(res)))
const rootReducer: Reducer<ApplicationState, AnyAction> = (state = defaultApplicationState, action) => {
  console.log(`User reducer is called, state: ${JSON.stringify(state)} action: ${JSON.stringify(action)}`)
  switch(action.type){
    case 'increment-counter':
      return {...state, counter: state.counter + 1}
    case 'update-user':
      return {...state, user: action.user}
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
