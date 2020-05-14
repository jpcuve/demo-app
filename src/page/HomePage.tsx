import React from 'react'
import Outline from './Outline'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { RouteComponentProps } from 'react-router'


const HomePage: React.FC<RouteComponentProps> = props => {
  const token = useSelector<ApplicationState, string>(state => state.token)
	return (
		<Outline {...props}>
			{token &&
			<div>
				<h1>You are logged in</h1>
			</div>
			}
			{!token &&
			<div>
				<h1>Public web site</h1>
			</div>
			}
		</Outline>
	)
}

export default HomePage