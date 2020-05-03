import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"

const AUTH_BASE = '/auth'

export const getApi = (dispatch: Dispatch<AnyAction>) => {
    return {
        signIn: async function (email: string, password: string): Promise<boolean> {
            dispatch({ type: 'update-errors', errors: [] })
            dispatch({type: 'update-fetching', fetching: true})
            try {
                const data: any = await client.post(`${AUTH_BASE}/sign-in`, { email, password })
                dispatch({ type: 'update-token', token: data.token })
                return true
            } catch (e) {
                dispatch({ type: 'update-errors', errors: [JSON.stringify(e)] })
                return false
            } finally {
                dispatch({type: 'update-fetching', fetching: false})
            }
        },
        signOut: async function () {
            dispatch({ type: 'update-errors', errors: [] })
            try {
                const data: any = await client.get(`${AUTH_BASE}/sign-out`)
                dispatch({ type: 'update-token', token: data.token })
            } catch (e) {
                dispatch({ type: 'update-errors', errors: [JSON.stringify(e)] })
            }
        },
        signUp: async function (email: string, password: string, name: string): Promise<boolean> {
            dispatch({ type: 'update-errors', errors: [] })
            try {
                const data: any = await client.post(`${AUTH_BASE}/sign-up`, { email, password, name })
                return true
            } catch (e) {
                return false
            }
        },
        test: async function () {
            try{
                const data: any = await client.get('/master/all-currency-groups')
                console.log(JSON.stringify(data))
            } catch(e){
                console.log(JSON.stringify(e))
            }

        }

    }
}