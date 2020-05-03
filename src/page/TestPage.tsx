import React from 'react'
import SignInForm from '../component/SignInForm'
import SignOutButton from '../component/SignOutButton'
import { useDispatch, useSelector } from 'react-redux'
import { getApi } from '../api'
import { ApplicationState } from '../store'
import ajax from '../ajax-loader.gif'

const TestPage: React.FC<{}> = () => {
    const api = getApi(useDispatch())
    const token = useSelector<ApplicationState, string>(state => state.token)
    const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
    const handleClick = () => {
        api.test()
    }
    return (
        <div>
            <div>Token:&nbsp;{token}</div>
            <div>Fetching:&nbsp;{fetching && <img src={ajax} alt="ajax"/>}</div>
            <SignInForm/>
            <SignOutButton/>
            <br/>
            <button onClick={handleClick}>Test</button>
        </div>
    )
}

export default TestPage