import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { Profile } from "./domain"

const AUTH_BASE = '/auth'

export const getApi = (dispatch: Dispatch<AnyAction>) => {
  const wrap: <T>(fn: () => Promise<T|undefined>) => Promise<T|undefined> = async (fn) => {
    dispatch({ type: 'update-errors', errors: [] })
    dispatch({ type: 'update-fetching', fetching: true })
    try {
      return await fn()
    } catch (e) {
      dispatch({ type: 'update-errors', errors: [e.message] })
    } finally {
      dispatch({ type: 'update-fetching', fetching: false })
    }
    return undefined
  }

  return {
    signIn: async (email: string, password: string) => wrap<Profile>(async () => {
      const profile: Profile = await client.post(`${AUTH_BASE}/sign-in`, { email, password })
      dispatch({ type: 'update-profile', profile })
      return profile
    }),
    signOut: async () => wrap<Profile>(async () => {
      const profile: Profile = await client.get(`${AUTH_BASE}/sign-out`)
      dispatch({ type: 'update-profile', profile })
      return profile
    }),
    test: async () => wrap(async () => {
      const data: any = await client.get('/master/all-currency-groups')
      console.log(JSON.stringify(data))
    }),
    error: async () => wrap<any>(async () => {
      const data: any = await client.get(`${AUTH_BASE}/error`)
      console.log(JSON.stringify(data))
      return data
    })
  }
}