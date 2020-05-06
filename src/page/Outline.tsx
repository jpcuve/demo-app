import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'

const Outline: React.FC<RouteComponentProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const forward = (url: string) => {
    setAnchorEl(null)
    props.history.push(url)
  }
  const token = useSelector<ApplicationState, string>(state => state.token)
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  return (
    <div>
      <div>Token: {token}</div>
      <div>Menu</div>
      <div>
        <ul className='error'>
          {errors.map(error => {
            return (
              <li key={error}>{error}</li>
            );
          })}
        </ul>
        {fetching && <span>Fetching...</span>}
        {props.children}
      </div>
    </div>
  )
}

export default Outline