import React from 'react'
import Outline from './PageTemplate'
import { getApi } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual, Instruction } from '../domain'
import StatementTable from '../component/StatementTable'
import { RouteComponentProps } from 'react-router'

const StatementPage: React.FC<RouteComponentProps> = props => {
	const dispatch = useDispatch()
  const perpetual = useSelector<ApplicationState, Perpetual|undefined>(state => state.perpetual)
	const instructions = useSelector<ApplicationState, Instruction[]>(state => state.instructions)
	React.useEffect(() => { 
		const api = getApi(dispatch)
		api.statement() 
	}, [dispatch])
	return (
		<Outline {...props}>
			<h1>Account statement</h1>
			<div>
				{perpetual && <StatementTable perpetual={perpetual} instructions={instructions}/>}
			</div>
		</Outline>
	);
}

export default StatementPage