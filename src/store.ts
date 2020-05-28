import { AnyAction, createStore } from "redux"
import { Perpetual, defaultPerpetual, Instruction } from "./domain"
import client from "./remote"

export interface ApplicationState {
  fetching: boolean,
  errors: string[],
  flash: string,
  accessToken?: string,
  counter: number,
  perpetual: Perpetual,
  instructions: Instruction[],
  messagingToken?: string,
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  errors: [],
  flash: 'Ready',
  counter: 0,
  perpetual: defaultPerpetual,
  instructions: [],
}

const rootReducer = (state: ApplicationState = defaultApplicationState, action: AnyAction) => {
  console.log(`Reducer is called, action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'increment-counter':
      return { ...state, counter: state.counter + 1 }
    case 'update-access-token':
      return { ...state, accessToken: action.accessToken }
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
    case 'update-messaging-token':
      return { ...state, messagingToken: action.messagingToken }
  }
  return state
}

let accessToken = localStorage.getItem('TOKEN') || undefined
export const store = createStore(rootReducer, { ...defaultApplicationState, accessToken })
if (accessToken){
  client.get(`/master/perpetual`).then((perpetual: Perpetual) => store.dispatch({type: 'update-perpetual', perpetual}))
}

store.subscribe(() => {
  if (store.getState().accessToken){
    localStorage.setItem('TOKEN', store.getState().accessToken as string)
  } else {
    localStorage.removeItem('TOKEN')
  }
})

