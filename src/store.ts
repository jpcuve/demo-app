import { AnyAction, createStore } from "redux"

export interface ApplicationState {
  fetching: boolean,
  token: string,
  counter: number,
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  token: '',
  counter: 0,
}

const rootReducer = (state: ApplicationState = defaultApplicationState, action: AnyAction) => {
  console.log(`Reducer is called, state: ${JSON.stringify(state)} action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'increment-counter':
      return { ...state, counter: state.counter + 1 }
    case 'update-token':
      return { ...state, token: action.token }
    case 'update-fetching':
      return { ...state, fetching: action.fetching }
  }
  return state
}

export const store = createStore(rootReducer, { ...defaultApplicationState, token: localStorage.getItem('TOKEN') || '' })
store.subscribe(() => {
  localStorage.setItem('TOKEN', store.getState().token)
})

