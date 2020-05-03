import React from 'react'
import SignInForm from '../component/SignInForm'
import SignOutButton from '../component/SignOutButton'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'

const TestPage: React.FC<{}> = () => {
    const api = getApi(useDispatch())
    const handleClick = () => {
        api.test()
    }
    return (
        <div>
            <SignInForm/>
            <SignOutButton/>
            <br/>
            <button onClick={handleClick}>Test</button>
        </div>
    )
}

export default TestPage