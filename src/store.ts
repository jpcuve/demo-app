import { AnyAction, createStore } from "redux"

export interface ApplicationState {
  fetching: boolean,
  errors: string[],
  token: string,
  counter: number,
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  errors: [],
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
    case 'update-errors':
      return { ...state, errors: action.errors }
  }
  return state
}

const token = localStorage.getItem('TOKEN') || ''
export const store = createStore(rootReducer, { ...defaultApplicationState, token })
store.subscribe(() => {
  localStorage.setItem('TOKEN', store.getState().token)
})

