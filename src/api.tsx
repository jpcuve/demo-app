import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { User } from "./domain"

const AUTH_BASE = '/auth'

export const api = (dispatch: Dispatch<AnyAction>) => {
    return {
        signIn: async function(email: String, password: String): Promise<boolean> {
            try{
                dispatch({type: 'update-errors', errors: []})
                const user: User = await client.post(`${AUTH_BASE}/sign-in`, {email, password})
                dispatch({type: 'update-user', user})
                return true
            } catch(e){
                dispatch({type: 'update-errors', errors: [JSON.stringify(e)]})
                return false
            }
        }
    }
}