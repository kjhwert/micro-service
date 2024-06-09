import React, {Suspense} from "react"

const Hello = React.lazy(() => import('app2/Hello'));

const App = () => {
    return <main>App<Suspense fallback='Loading...'>
        <Hello text='asdfsf' />
    </Suspense></main>
}

export default App

