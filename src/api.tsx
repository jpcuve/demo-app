import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"

const AUTH_BASE = '/auth'

export const getApi = (dispatch: Dispatch<AnyAction>) => {
  const wrap = async (fn: () => void) => {
    dispatch({ type: 'update-errors', errors: [] })
    dispatch({ type: 'update-fetching', fetching: true })
    try {
      fn()
    } catch (e) {
      dispatch({ type: 'update-errors', errors: [JSON.stringify(e)] })
    } finally {
      dispatch({ type: 'update-fetching', fetching: false })
    }
    return undefined
  }

  return {
    signIn: async (email: string, password: string) => wrap(async () => {
      const data: any = await client.post(`${AUTH_BASE}/sign-in`, { email, password })
      dispatch({ type: 'update-token', token: data.token })
    }),
    signOut: async () => wrap(async () => {
      const data: any = await client.get(`${AUTH_BASE}/sign-out`)
      dispatch({ type: 'update-token', token: data.token })
    }),
    test: async () => wrap(async () => {
      const data: any = await client.get('/master/all-currency-groups')
      console.log(JSON.stringify(data))
    })
  }
}