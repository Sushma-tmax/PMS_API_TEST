import React from 'react'
import { useParams } from 'react-router-dom'
import MidyearRejectRating from '../../components/midyearperformanceappraisal/MidyearRejectRating'
import { useGetEmployeeAppraisalQuery, useGetRatingScaleQuery } from '../../service'

const MidYearRejectRating = () => {
    const { employee_id } = useParams()
    const { data, isLoading } = useGetEmployeeAppraisalQuery(employee_id)
    const {data:ratingScaleData} = useGetRatingScaleQuery(employee_id)

    if (isLoading) {
        <p> Loading...</p>
    }
    return (
        <>
            <MidyearRejectRating employeeData={data}   ratingScaleData={ratingScaleData} />
        </>
    )
}

export default MidYearRejectRating