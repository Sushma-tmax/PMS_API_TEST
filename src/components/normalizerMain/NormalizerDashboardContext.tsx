import { useState, createContext, useContext, useEffect } from "react";

const DashboardContext = createContext(undefined)

export function useDashboardContext() {
    return useContext(DashboardContext)
}


function useProvidedNormalizerContext() {
    const [statusSort, setstatusSort] = useState<any>('')
    return {
        statusSort,
        setstatusSort

    }

}

export default function NormalizerDashboardContext(props: any) {
    const data = useProvidedNormalizerContext()
    const { children } = props
    return (
        // @ts-ignore
        <DashboardContext.Provider value={data}>
            {children}
        </DashboardContext.Provider>
    )

}