import { AnyAction, createStore } from "redux"
import { Profile, defaultProfile } from "./domain"

export interface ApplicationState {
  fetching: boolean,
  errors: string[],
  profile: Profile,
  counter: number,
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  errors: [],
  profile: defaultProfile,
  counter: 0,
}

const rootReducer = (state: ApplicationState = defaultApplicationState, action: AnyAction) => {
  console.log(`Reducer is called, state: ${JSON.stringify(state)} action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'increment-counter':
      return { ...state, counter: state.counter + 1 }
    case 'update-profile':
      return { ...state, profile: action.profile }
    case 'update-fetching':
      return { ...state, fetching: action.fetching }
    case 'update-errors':
      return { ...state, errors: action.errors }
  }
  return state
}

const profileAsString: string | null = localStorage.getItem('PROFILE')
const profile: Profile = profileAsString ? JSON.parse(profileAsString) as Profile : defaultProfile
export const store = createStore(rootReducer, { ...defaultApplicationState, profile })
store.subscribe(() => {
  localStorage.setItem('TOKEN', JSON.stringify(store.getState().profile))
})

