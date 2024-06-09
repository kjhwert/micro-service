import React, {Suspense} from "react"

// @ts-ignore
const Hello = React.lazy(() => import('app2/Hello'));

const App = () => {
    return <main>App<Suspense fallback='Loading...'>
        <Hello />
    </Suspense></main>
}

export default App

