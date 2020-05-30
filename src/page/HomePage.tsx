import React from 'react'
import Outline from './PageTemplate'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { RouteComponentProps } from 'react-router'
import ReactMarkdown from 'react-markdown'
import { Perpetual } from '../domain'


const HomePage: React.FC<RouteComponentProps> = props => {
	const perpetual = useSelector<ApplicationState, Perpetual|undefined>(state => state.perpetual)
	const source = '# This is a header\n\nAnd this is a paragraph'
	return (
		<Outline {...props}>
			{perpetual &&
			<div>
				<h1>Welcome, {perpetual.profile.name}</h1>
			</div>
			}
			{!perpetual &&
			<div>
				<h1>Public web site</h1>
				<ReactMarkdown source={source}/>
			</div>
			}
		</Outline>
	)
}

export default HomePage