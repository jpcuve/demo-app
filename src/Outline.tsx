import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {
  fetching: boolean;
  errors: string[];
}

const Outline: React.FC<Props> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const forward = (url: string) => {
    setAnchorEl(null)
    props.history.push(url)
  }
  return (
    <>
      <div>Menu</div>
      <div>
        <ul style={{ color: 'red' }}>
            {props.errors.map(error => {
              return (
                <li key={error}>{error}</li>
              );
            })}
          </ul>
          {props.fetching && <span>Fetching...</span>}
        {props.children}
      </div>
    </>
  )
}

export default Outline