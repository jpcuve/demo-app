import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual } from '../domain'
import firebase from 'firebase'
import { getApi } from '../api'

const PageTemplate: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch()
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  const flash = useSelector<ApplicationState, string>(state => state.flash)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  const perpetual = useSelector<ApplicationState, Perpetual|undefined>(state => state.perpetual)
  const messagingToken = useSelector<ApplicationState, string|undefined>(state => state.messagingToken)
  const signOut = async () => {
    const api = getApi(dispatch)
    await firebase.auth().signOut()
    await api.signOut()
    props.history.push('/')
  }
  return (
    <div>
      <div>Messaging token: {messagingToken}</div>
      {perpetual && <div>User: {perpetual.profile.name} &nbsp; Account: {perpetual.account.name} &nbsp; Bank: {perpetual.bank.name}</div>}
      {!perpetual && <div>Public</div>}
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
            <li><Link to="/test">Test</Link></li>
          </ul>
        </nav>
        {perpetual && <button onClick={signOut}>Sign-out</button>}
      </div>      
      <div className="right">
        {props.children}
      </div>
    </div>
  )
}

export default PageTemplate