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
    signIn: async (email: string, password: string) => wrap<Token>(async () => {
      const token: Token = await client.post(`${AUTH_BASE}/sign-in`, { email, password })
      dispatch({ type: 'update-token', token: token.token })
      return token
    }),
    socialSignIn: async (social: string, identity: string) => wrap<Token>(async () => {
      const token: Token = await client.post(`${AUTH_BASE}/social-sign-in`, {social, identity})
      dispatch({ type: 'update-token', token: token.token })
      return token
    }),
    signUp: async (email: string, password: string, name: string) => wrap<void>(async () => {
      await client.post(`${AUTH_BASE}/sign-up`, { email, password, name })
    }),
    signOut: async () => wrap<Token>(async () => {
      const token: Token = await client.get(`${AUTH_BASE}/sign-out`)
      dispatch({ type: 'update-token', token: token.token })
      return token
    }),
    updatePassword: async (newPassword: string, newPasswordConfirmation: string, token: string) => wrap<void>(async () => {
      await client.post(`${AUTH_BASE}/update-password`, { newPassword, newPasswordConfirmation, token })
    }),
    resetPassword: async (email: string) => wrap<void>(async () => {
      await client.post(`${AUTH_BASE}/reset-password`, { email })
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