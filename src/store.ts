import { AnyAction, createStore } from "redux"
import { Perpetual, Instruction } from "./domain"

export interface ApplicationState {
  fetching: boolean,
  errors: string[],
  flash: string,
  counter: number,
  perpetual?: Perpetual,
  instructions: Instruction[],
  messagingToken?: string,
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  errors: [],
  flash: 'Ready',
  counter: 0,
  instructions: [],
}

const rootReducer = (state: ApplicationState = defaultApplicationState, action: AnyAction) => {
  console.log(`Reducer is called, action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'increment-counter':
      return { ...state, counter: state.counter + 1 }
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

export const store = createStore(rootReducer, { ...defaultApplicationState })
