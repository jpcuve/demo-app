import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { Token, Perpetual, Instruction } from "./domain"

const AUTH_BASE = '/auth'
const MASTER_BASE = '/master'

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
  }

  return {
    flash: (message: string) => {
      dispatch({type: 'update-flash', flash: message })
      setTimeout(() => {
        dispatch({type: 'update-flash', flash: 'Ready'})
      }, 3000)
    },
    firebaseSignIn: async (user: any) => wrap<Token>(async () => {
      const token: Token = await client.post(`${AUTH_BASE}/firebase-sign-in`, user)
      localStorage.setItem('TOKEN', token.token)
      return token
    }),
    signOut: async () => wrap(async () => {
      await client.get(`${AUTH_BASE}/sign-out`)
      localStorage.removeItem('TOKEN')
    }),
    updateMessagingToken: (messagingToken: string) => wrap(async () => {
      const token: Token = await client.post(`${AUTH_BASE}/update-messaging-token`, {token: messagingToken})
      dispatch({ type: 'update-messaging-token', messagingToken: token.token})
    }),
    perpetual: async () => wrap<Perpetual>(async () => {
      const perpetual: Perpetual = await client.get(`${MASTER_BASE}/perpetual`)
      dispatch({ type: 'update-perpetual', perpetual })
      return perpetual
    }),
    statement: async () => wrap<Instruction[]>(async () => {
      const instructions: Instruction[] = await client.get(`${MASTER_BASE}/statement`)
      dispatch({ type: 'update-instructions', instructions})
      return instructions
    }),
    error: async () => wrap<any>(async () => {
      const data: any = await client.get(`${AUTH_BASE}/error`)
      console.log(JSON.stringify(data))
      return data
    })
  }
}