import React, {Suspense} from "react"
import RemoteErrorBoundary from "components/RemoteErrorBoundary";

const Hello = React.lazy(() => import('app2/Hello'));

const App = () => {
    return (
        <main>
            App
            <RemoteErrorBoundary>
                <Suspense fallback='Loading...'>
                    <Hello text={'asdfsjdfkjsd'} />
                </Suspense>
            </RemoteErrorBoundary>
        </main>)
}

export default App

