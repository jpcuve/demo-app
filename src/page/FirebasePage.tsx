import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import SocialSignInPanel from '../component/SocialSignInPanel'

const FirebasePage: React.FC<PageProps> = props => {
  return (
    <Outline {...props}>
      <div>Firebase test</div>
      <SocialSignInPanel/>
    </Outline>
  )
}

export default FirebasePage