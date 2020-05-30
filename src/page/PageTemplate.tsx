import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual } from '../domain'
import firebase from 'firebase'

const PageTemplate: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch()
  const accessToken = useSelector<ApplicationState, string|undefined>(state => state.accessToken)
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  const flash = useSelector<ApplicationState, string>(state => state.flash)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  const perpetual = useSelector<ApplicationState, Perpetual>(state => state.perpetual)
  const messagingToken = useSelector<ApplicationState, string|undefined>(state => state.messagingToken)
  const signOut = async () => {
    await firebase.auth().signOut()
    await dispatch({type: 'update-access-token', accessToken: undefined})
    props.history.push('/')
  }
  return (
    <div>
      <div>Access token: {accessToken}</div>
      <div>Messaging token: {messagingToken}</div>
      {accessToken && <div>User: {perpetual.profile.name} &nbsp; Account: {perpetual.account.name} &nbsp; Bank: {perpetual.bank.name}</div>}
      {!accessToken && <div>Public</div>}
      {flash && <div className="flash">{flash}</div>}
      <div>
        <ul className='error'>
          {errors.map(error => {
            return (
              <li key={error}>{error}</li>
            );
          })}
        </ul>
        {fetching && <span>Fetching...</span>}
      </div>
      <div className="left">
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/auth">Auth</Link></li>
            {accessToken && <li><Link to="/statement">Statement</Link></li>}
            <li><Link to="/test">Test</Link></li>
          </ul>
        </nav>
        {accessToken && <button onClick={signOut}>Sign-out</button>}
      </div>      
      <div className="right">
        {props.children}
      </div>
    </div>
  )
}

export default PageTemplate