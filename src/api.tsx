import client from "./remote"
import { Dispatch } from "react"
import { AnyAction } from "redux"

const AUTH_BASE = '/auth'

export const getApi = (dispatch: Dispatch<AnyAction>) => {
    return {
        signIn: async function (email: String, password: String): Promise<boolean> {
            dispatch({ type: 'update-errors', errors: [] })
            try {
                const data: any = await client.post(`${AUTH_BASE}/sign-in`, { email, password })
                dispatch({ type: 'update-token', token: data.token })
                return true
            } catch (e) {
                dispatch({ type: 'update-errors', errors: [JSON.stringify(e)] })
                return false
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