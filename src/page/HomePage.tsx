import React from 'react'
import Outline from '../Outline'
import { PageProps } from '..'


const HomePage: React.FC<PageProps> = props => {
    const [fetching, setFetching] = React.useState<boolean>(false)
    const [errors, setErrors] = React.useState<string[]>([])
    return (
        <Outline fetching={fetching} errors={errors} {...props}>
            <div>Home page...</div>
        </Outline>
    );
}

export default HomePage