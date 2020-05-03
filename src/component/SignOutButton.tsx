import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'

const SignOutButton: React.FC<{}> = () => {
    const api = getApi(useDispatch())
    const handleClick = () => {
        api.signOut()
    }
    return (
        <button onClick={handleClick}>Sign-out</button>
    )
}

export default SignOutButton