import React from 'react'
import { RouteComponentProps } from 'react-router'
import Outline from './Outline'
import FirebaseSignInPanel from '../component/FirebaseSignInPanel'

const FirebasePage: React.FC<RouteComponentProps> = props => {
  return (
    <Outline {...props}>
      <FirebaseSignInPanel/>
    </Outline>
  )
}

export default FirebasePage