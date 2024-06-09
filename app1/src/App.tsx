import React, {Suspense} from "react"
import RemoteErrorBoundary from "components/RemoteErrorBoundary";


const Hello = React.lazy(() => import('app2/Hello'));
const EventVerticalCard = React.lazy(() => import('app2/EventVerticalCard'));

const App = () => {
    return (
        <main>
            App
            <RemoteErrorBoundary>
                <Suspense fallback='Loading...'>
                    <Hello text={'asdfsjdfkjsd'} />
                </Suspense>
            </RemoteErrorBoundary>
            <RemoteErrorBoundary>
                <Suspense fallback='Loading...'>
                    <EventVerticalCard isScrap={false} onScrapClick={() => {}} exclusiveBadgeText={""} reserveBadgeText={""} imageUrls={{
                        thumbnailUrl: ""
                    }} hospitalName={"병원명"} hospitalLandmark={"랜드마크"} eventName={"시술이벤트명"} eventPrice={10000} isKoreanPriceFormat={true} stats={{
                        reviewAverage: 111,
                        totalReviewCount: 123,
                        scrapCount: 111
                    }} onEventClick={() => {}} isVATVisible={false} isNewEvent={false} />
                </Suspense>
            </RemoteErrorBoundary>
        </main>)
}

export default App

