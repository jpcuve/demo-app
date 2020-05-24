import React from 'react'
import { RouteComponentProps } from 'react-router'
import Outline from './Outline'

const AuthPage: React.FC<RouteComponentProps> = props => {
    return (
        <Outline {...props}>
            <div>Auth page</div>
        </Outline>
    )
}

export default AuthPage