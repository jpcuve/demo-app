import React from 'react'
import Outline from './Outline'
import { PageProps } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { User, defaultUser } from '../domain'
import client from '../remote'
import { ApplicationState } from '../store'


const HomePage: React.FC<PageProps> = props => {
    const [fetching, setFetching] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<string[]>([])
    const count = useSelector<ApplicationState, number>(state => state.counter)
    const user = defaultUser
    const dispatch = useDispatch()
    const init = async () => {
        setFetching(true)
        setErrors([])
        try {
            const currencyGroups = await client.get(`/master/all-currency-groups`)
            console.log(`Currency groups: ${JSON.stringify(currencyGroups)}`)
        } catch(e){
            setErrors([JSON.stringify(e)])
        } finally {
            setFetching(false)
        }
    }
    React.useEffect(() => { init() }, [])
    return (
        <Outline user={user} fetching={fetching} errors={errors} {...props}>
            <div>Home page...</div>
            <div>Count: {count}</div>
            <button onClick={() => dispatch({type: 'increment-counter'})}>Increment</button>
        </Outline>
    );
}

export default HomePage