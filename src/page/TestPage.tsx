import React from 'react'
import SignInForm from '../component/SignInForm'
import SignOutButton from '../component/SignOutButton'

const TestPage: React.FC<{}> = () => {
    return (
        <div>
            <SignInForm/>
            <SignOutButton/>
        </div>
    )
}

export default TestPage