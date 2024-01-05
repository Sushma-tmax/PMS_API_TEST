import { useState, createContext, useContext, useEffect } from "react";

const DashboardContext = createContext(undefined)

export function useDashboardContext() {
    return useContext(DashboardContext)
}


function useProvidedAppraisalContext() {
    const [statusSort, setstatusSort] = useState<any>('')
    const [FilteredEmployeeData, setFilteredEmployeeData] = useState<any>([])
    const [statusofUnknown, setstatusofUnknown] = useState<any>(5)
    return {
        statusSort,
        setstatusSort,
        FilteredEmployeeData,
        setFilteredEmployeeData,
        statusofUnknown
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