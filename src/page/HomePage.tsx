import React from 'react'
import Outline from './PageTemplate'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { RouteComponentProps } from 'react-router'
import ReactMarkdown from 'react-markdown'


const HomePage: React.FC<RouteComponentProps> = props => {
	const accessToken = useSelector<ApplicationState, string|undefined>(state => state.accessToken)
	const source = '# This is a header\n\nAnd this is a paragraph'
	return (
		<Outline {...props}>
			{accessToken &&
			<div>
				<h1>You are logged in</h1>
			</div>
			}
			{!accessToken &&
			<div>
				<h1>Public web site</h1>
				<ReactMarkdown source={source}/>
			</div>
			}
		</Outline>
	)
}

export default HomePage