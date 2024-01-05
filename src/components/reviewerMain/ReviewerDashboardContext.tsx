import { useState, createContext, useContext, useEffect } from "react";

const DashboardContext = createContext(undefined)

export function useDashboardContext() {
    return useContext(DashboardContext)
}


function useProvidedReviewerContext() {
    const [statusSort, setstatusSort] = useState<any>('')
    const [All, setAll] = useState<any>('hi')
    return {
        statusSort,
        setstatusSort,
        All, setAll

    }

}

export default function ReviewerDashboardContext(props: any) {
    const data = useProvidedReviewerContext()
    const { children } = props
    return (
        // @ts-ignore
        <DashboardContext.Provider value={data}>
            {children}
        </DashboardContext.Provider>
    )

}