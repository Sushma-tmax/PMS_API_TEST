import { useState, createContext, useContext, useEffect } from "react";

const DashboardContext = createContext(undefined)

export function useDashboardContext() {
    return useContext(DashboardContext)
}


function useProvidedAppraisalContext() {
    const [statusSort, setstatusSort] = useState<any>('')
    return {
        statusSort,
        setstatusSort

    }

}

export default function AppraiserDashboardContext(props: any) {
    const data = useProvidedAppraisalContext()
    const { children } = props
    return (
        // @ts-ignore
        <DashboardContext.Provider value={data}>
            {children}
        </DashboardContext.Provider>
    )

}