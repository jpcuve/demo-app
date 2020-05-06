import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual } from '../domain'
import SignOutButton from '../component/SignOutButton'
import UpdatePasswordPage from './UpdatePasswordPage'

const Outline: React.FC<RouteComponentProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const forward = (url: string) => {
    setAnchorEl(null)
    props.history.push(url)
  }
  const token = useSelector<ApplicationState, string>(state => state.token)
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  const perpetual = useSelector<ApplicationState, Perpetual>(state => state.perpetual)
  return (
    <div>
      {token && <div>User: {perpetual.profile.name} &nbsp; Account: {perpetual.account.name} &nbsp; Bank: {perpetual.bank.name}</div>}
      {!token && <div>Public</div>}
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
            <li>
              <span>Auth</span>
              <ul>
                {!token && <li ><Link to="/sign-in">Sign-in</Link></li>}
                {!token && <li><Link to="/sign-up">Sign-up</Link></li>}
                {token && <li><Link to="/update-password">Update password</Link></li>}
                {token && <li><Link to="/reset-password">Reset password</Link></li>}
              </ul>
            </li>
            <li><Link to="/test">Test</Link></li>
          </ul>
        </nav>
        {token && <SignOutButton/>}
      </div>      
      <div className="right">
        {props.children}
      </div>
    </div>
  )
}

export default Outline