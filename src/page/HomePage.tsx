import React from 'react'
import Outline from './Outline'
import { PageProps, ApplicationState } from '..'
import { useSelector, useDispatch } from 'react-redux'


const HomePage: React.FC<PageProps> = props => {
    const [fetching, setFetching] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<string[]>([])
    const count: any = useSelector<ApplicationState>(state => state.counter)
    const dispatch = useDispatch()
    console.debug(`Count: ${count}`)
    return (
        <Outline fetching={fetching} errors={errors} {...props}>
            <div>Home page...</div>
            <div>Count: {count}</div>
            <button onClick={() => dispatch({type: 'increment-counter'})}>Increment</button>
        </Outline>
    );
}

export default HomePage