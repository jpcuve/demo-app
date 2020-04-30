import React from 'react'
import Outline from './Outline'
import { PageProps } from '..'


const HomePage: React.FC<PageProps> = props => {
    const [fetching, setFetching] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<string[]>([])
    const [count, setCount] = React.useState<number>(0)
    console.debug(`Count: ${count}`)
    return (
        <Outline fetching={fetching} errors={errors} {...props}>
            <div>Home page...</div>
            <div>Count: {count}</div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </Outline>
    );
}

export default HomePage