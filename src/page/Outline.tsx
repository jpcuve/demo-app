import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual } from '../domain'
import SignOutButton from '../component/SignOutButton'

const Outline: React.FC<RouteComponentProps> = props => {
  const token = useSelector<ApplicationState, string>(state => state.token)
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  const flash = useSelector<ApplicationState, string>(state => state.flash)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  const perpetual = useSelector<ApplicationState, Perpetual>(state => state.perpetual)
  const signOutCompleted = () => {
    props.history.push('/')
  }
  return (
    <div>
      {token && <div>User: {perpetual.profile.name} &nbsp; Account: {perpetual.account.name} &nbsp; Bank: {perpetual.bank.name}</div>}
      {!token && <div>Public</div>}
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
            {token && <li><Link to="/statement">Statement</Link></li>}
            <li><Link to="/test">Test</Link></li>
          </ul>
        </nav>
        {token && <SignOutButton onCompleted={signOutCompleted}/>}
      </div>      
      <div className="right">
        {props.children}
      </div>
    </div>
  )
}

export default Outline