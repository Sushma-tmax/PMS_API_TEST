import React from 'react'
import { useParams } from 'react-router-dom'
import MidyearRejectRating from '../../components/midyearperformanceappraisal/MidyearRejectRating'
import { useGetEmployeeAppraisalQuery, useGetObjectiveTitleQuery, useGetRatingScaleQuery } from '../../service'

const MidYearRejectRating = () => {
    const { employee_id } = useParams()
    const { data : employeeData, isLoading } = useGetEmployeeAppraisalQuery(employee_id)
    const {data:ratingsData} = useGetRatingScaleQuery(employee_id)
    const {data: objectiveTitleData} = useGetObjectiveTitleQuery("");

    if (isLoading) {
        <p> Loading...</p>
    }
    return (
        
        <>
            <MidyearRejectRating 
            employeeData={employeeData}   
            ratingsData ={ratingsData}
            objectiveTitleData= {objectiveTitleData} />
        </>
    )
}

export default MidYearRejectRating