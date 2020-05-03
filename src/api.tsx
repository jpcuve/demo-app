import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { User, defaultUser } from "./domain"

const AUTH_BASE = '/auth'

export const getApi = (dispatch: Dispatch<AnyAction>) => {
    return {
        signIn: async function(email: String, password: String): Promise<boolean> {
          dispatch({type: 'update-errors', errors: []})
          try{
                const user: User = await client.post(`${AUTH_BASE}/sign-in`, {email, password})
                dispatch({type: 'update-user', user})
                return true
            } catch(e){
                dispatch({type: 'update-errors', errors: [JSON.stringify(e)]})
                return false
            }
        },
        signOut: async function() {
          dispatch({type: 'update-errors', errors: []})
          try{
                await client.get(`${AUTH_BASE}/sign-out`)
                dispatch({type: 'update-user', defaultUser})
            } catch(e){
                dispatch({type: 'update-errors', errors: [JSON.stringify(e)]})
            }
        }

    }
}