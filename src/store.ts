import { AnyAction, createStore } from "redux"
import { Perpetual, defaultPerpetual, Instruction } from "./domain"
import client from "./remote"

export interface ApplicationState {
  fetching: boolean,
  errors: string[],
  flash: string,
  token: string,
  counter: number,
  perpetual: Perpetual,
  instructions: Instruction[],
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  errors: [],
  flash: 'Ready',
  token: '',
  counter: 0,
  perpetual: defaultPerpetual,
  instructions: [],
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
    case 'update-flash':
      return { ...state, flash: action.flash }
    case 'update-perpetual':
      return { ...state, perpetual: action.perpetual }
    case 'update-instructions':
      return { ...state, instructions: action.instructions }
  }
  return state
}

const token = localStorage.getItem('TOKEN') || ''
export const store = createStore(rootReducer, { ...defaultApplicationState, token })
if (token){
  client.get(`/master/perpetual`).then((perpetual: Perpetual) => store.dispatch({type: 'update-perpetual', perpetual}))
}
store.subscribe(() => {
  localStorage.setItem('TOKEN', store.getState().token)
})

